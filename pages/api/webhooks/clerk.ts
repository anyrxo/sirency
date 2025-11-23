import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

// Disable body parser so we can verify the raw body signature
export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper to read the raw body from the request
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      resolve(body)
    })
    req.on('error', (err) => {
      reject(err)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('FATAL: Missing CLERK_WEBHOOK_SECRET')
    return res.status(500).json({ error: 'Server Config Error' })
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string
  const svix_timestamp = req.headers['svix-timestamp'] as string
  const svix_signature = req.headers['svix-signature'] as string

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Auth Error: Missing svix headers')
    return res.status(400).json({ error: 'Missing headers' })
  }

  // Get the raw body
  let body: string
  try {
    body = await getRawBody(req)
  } catch (err) {
    console.error('Error reading body:', err)
    return res.status(400).json({ error: 'Error reading body' })
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Verification Error:', err)
    return res.status(400).json({ error: 'Verification failed' })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(`Processing ${eventType} for user ${id}`)

  // Supabase logic
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase Keys')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, public_metadata, unsafe_metadata } = evt.data
        const email = email_addresses?.[0]?.email_address
        const fullName = `${first_name || ''} ${last_name || ''}`.trim()
        // @ts-ignore
        const role = public_metadata?.role || unsafe_metadata?.role || 'model'

        const { error } = await supabase.from('profiles').upsert({
            id, email, full_name: fullName, avatar_url: image_url, role, updated_at: new Date().toISOString()
        })
        if (error) console.error('Supabase Upsert Error:', error)
        else console.log(`✅ Synced user ${id} to Supabase`)

    } else if (eventType === 'user.deleted') {
        const { id } = evt.data
        await supabase.from('profiles').delete().eq('id', id)
        console.log(`✅ Deleted user ${id}`)
    }
  } catch (err) {
      console.error('Database Processing Error:', err)
      // Swallow DB errors to return 200 to Clerk so it stops retrying
  }

  return res.status(200).json({ success: true })
}

