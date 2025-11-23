// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Webhook } from "https://esm.sh/svix@0.71.0"

console.log("Hello from Clerk Webhook!")

serve(async (req) => {
  // 1. Verify the request is POST
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // 2. Get the payload and headers
  const payload = await req.text()
  const headers = req.headers

  // 3. Get the Svix headers for verification
  const svix_id = headers.get("svix-id")
  const svix_timestamp = headers.get("svix-timestamp")
  const svix_signature = headers.get("svix-signature")

  // 4. Verify the webhook signature
  // You need to set CLERK_WEBHOOK_SECRET in your Supabase Edge Function secrets
  const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET')
  
  if (!webhookSecret) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    return new Response('Server Error: Missing Secret', { status: 500 })
  }

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  const wh = new Webhook(webhookSecret)
  let evt;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any
  } catch (err) {
    console.error('Error verifying webhook:', err.message)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // 5. Initialize Supabase Client
  const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 6. Handle the event
  const { id, type } = evt
  const { data } = evt

  console.log(`Processing event: ${type} for user ${data.id}`)

  if (type === 'user.created' || type === 'user.updated') {
    const email = data.email_addresses?.[0]?.email_address
    const fullName = `${data.first_name || ''} ${data.last_name || ''}`.trim()
    const avatarUrl = data.image_url
    
    // Check metadata for role (priority: public -> unsafe)
    // Clerk usually sends unsafe_metadata in the webhook payload
    const role = data.public_metadata?.role || data.unsafe_metadata?.role || 'model' // Default to model if undefined

    // Upsert into profiles table
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: data.id,
        email: email,
        full_name: fullName,
        avatar_url: avatarUrl,
        role: role,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error upserting profile:', error)
      return new Response('Database Error', { status: 500 })
    }
    
    console.log(`Successfully synced user ${data.id}`)
  } else if (type === 'user.deleted') {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', data.id)

    if (error) {
      console.error('Error deleting profile:', error)
      return new Response('Database Error', { status: 500 })
    }
    console.log(`Successfully deleted user ${data.id}`)
  }

  return new Response(JSON.stringify({ message: 'Webhook received' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})

