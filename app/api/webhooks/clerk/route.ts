import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import dns from 'node:dns'
import { NextResponse } from 'next/server'

// FORCE IPv4: Fixes "fetch failed" on Vercel/Node 18+ when connecting to Supabase
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first')
  }
} catch (e) {
  // Ignore
}

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('Edge Function Invoked: /api/webhooks/clerk')

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return new Response('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local', {
      status: 500,
    })
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  let payload: any
  try {
    payload = await req.json()
  } catch (err) {
    return new Response('Error parsing body', { status: 400 })
  }
  const body = JSON.stringify(payload)

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
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  const eventType = evt.type

  console.log(`Webhook received: ${eventType}`)

  // Sync to Supabase using Service Role (Admin)
  // Using explicit connection params like the reference project
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  )

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata, unsafe_metadata } = evt.data
    const email = email_addresses?.[0]?.email_address
    const fullName = `${first_name || ''} ${last_name || ''}`.trim()
    
    // @ts-ignore
    const role = public_metadata?.role || unsafe_metadata?.role || 'model'

    if (!email) {
      console.log('No email found for user', id)
      return new Response('No email found', { status: 200 })
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: id, // Mapping Clerk ID directly to profile ID
        email: email,
        full_name: fullName,
        avatar_url: image_url,
        role: role,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })

    if (error) {
      console.error('Supabase sync error:', error)
      return new Response('Error syncing to Supabase', { status: 500 })
    }

    console.log(`Successfully synced user ${id} to Supabase`)

  } else if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (id) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Supabase delete error:', error)
        return new Response('Error deleting from Supabase', { status: 500 })
      }
      console.log(`Successfully deleted user ${id} from Supabase`)
    }
  }

  return new Response('Success', { status: 200 })
}

