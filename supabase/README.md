# SirenCY - Supabase Edge Functions

## Deploying the Clerk Webhook

1. **Login to Supabase CLI** (if not already logged in):
   ```bash
   npx supabase login
   ```

2. **Deploy the Function**:
   ```bash
   npx supabase functions deploy clerk-webhook --project-ref herjyhkvtgmoazimibaa
   ```

3. **Set Secrets**:
   You need to get the "Signing Secret" from the Clerk Dashboard (Webhooks page) and set it here:
   ```bash
   npx supabase secrets set CLERK_WEBHOOK_SECRET=whsec_... --project-ref herjyhkvtgmoazimibaa
   ```

## Webhook URL
Once deployed, your Webhook URL will be:
**`https://herjyhkvtgmoazimibaa.supabase.co/functions/v1/clerk-webhook`**

## Clerk Configuration
1. Go to **Clerk Dashboard** -> **Webhooks**.
2. Click **"Add Endpoint"**.
3. Paste the URL above.
4. Select events: `user.created`, `user.updated`, `user.deleted`.
5. Click **Create**.
6. Copy the **Signing Secret** (starts with `whsec_`) and run the "Set Secrets" command above.

