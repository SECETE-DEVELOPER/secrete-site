# Vercel Environment Variables Setup

Your MongoDB connection string has been set up locally in `.env.local`

## To add to Vercel:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `secrete-site`
3. Click on "Settings"
4. Go to "Environment Variables"
5. Click "Add New"
6. Enter:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://secretedev_db_user:VdIKbwqhXvTt9PZd@cluster0.b0mqcj7.mongodb.net/secret-project?retryWrites=true&w=majority`
   - **Environment:** Select all (Development, Preview, Production)
7. Click "Add"
8. Go to "Deployments" and click "Redeploy" on the latest deployment

## Testing

### Local Testing
```bash
npm run dev
```
- Login to the site
- Send a chat message
- Check MongoDB Atlas to see the data stored

### Vercel Testing
After redeploying:
- Visit your live site
- Send a chat message
- Check MongoDB Atlas Collections → messages

## MongoDB Atlas Whitelist

If you get connection errors, you may need to whitelist IPs:
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Click "Add IP Address"
4. Select "Allow access from anywhere" (0.0.0.0/0) for development
5. Or add Vercel's IP ranges for production

## Verify Connection

Check the server logs:
- Local: `npm run dev` output in terminal
- Vercel: Settings → Function Logs

Look for messages like:
- `✅ Connected to MongoDB`
- `💬 Message saved to MongoDB`
