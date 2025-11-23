// app/api/webhooks/clerk/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Ensure this route is dynamic
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('✅ Webhook received at /api/webhooks/clerk')
  
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing svix headers')
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('❌ Missing CLERK_WEBHOOK_SECRET in Env')
    return new Response('Server Error: Missing Webhook Secret', { status: 500 })
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('❌ Error verifying webhook:', err)
    return new Response('Error verifying webhook', {
      status: 400,
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Processing ${eventType} for user ${id}`)

  // Initialize Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials')
    // Return 200 to acknowledge webhook receipt even if DB fails, to prevent retries spamming logs
    // But log error clearly
    return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata, unsafe_metadata } = evt.data
    
    const email = email_addresses?.[0]?.email_address
    const fullName = `${first_name || ''} ${last_name || ''}`.trim()
    
    // @ts-ignore
    const role = public_metadata?.role || unsafe_metadata?.role || 'model'

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: id,
        email: email,
        full_name: fullName,
        avatar_url: image_url,
        role: role,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('❌ Supabase Upsert Error:', error)
      return NextResponse.json({ error: 'Database Error' }, { status: 500 })
    }
    console.log(`✅ Successfully synced user ${id} to Supabase`)
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Supabase Delete Error:', error)
      return NextResponse.json({ error: 'Database Error' }, { status: 500 })
    }
    console.log(`✅ Successfully deleted user ${id}`)
  }

  return NextResponse.json({ success: true })
}
