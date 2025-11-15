# MongoDB Setup Guide

This project now uses MongoDB Atlas for permanent data storage on Vercel.

## Setup Steps

### 1. Create MongoDB Atlas Account (Free)
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for a free account
- Create a new project

### 2. Create a Cluster
- Click "Build a Cluster"
- Choose the free M0 tier
- Select your preferred region (e.g., AWS, us-east-1)
- Complete the setup

### 3. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Create username and password
- Remember these credentials!

### 4. Get Connection String
- Go to "Database" → "Connect"
- Click "Drivers"
- Copy the connection string
- It will look like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

### 5. Add to Environment Variables

#### Local Development (.env.local)
Create a `.env.local` file in the root directory:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secret-project?retryWrites=true&w=majority
```

#### Vercel Deployment
1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add new variable:
   - Name: `MONGODB_URI`
   - Value: Your connection string (same as above)
4. Make sure it's set for Production
5. Redeploy

### 6. Install Dependencies
```bash
npm install mongodb
```

## How It Works

**Collections:**
- `messages` - Chat messages
- `login_logs` - Login attempts

**Features:**
- ✅ Permanent storage across deployments
- ✅ Automatic old data cleanup (500 messages, 1000 logs max)
- ✅ Works on both local and Vercel
- ✅ Indexed for fast queries

## Testing

### Local
1. Run `npm run dev`
2. Send a chat message
3. Check MongoDB Atlas dashboard → Collections → messages

### Production
1. Deploy to Vercel
2. Send a message on the live site
3. Check MongoDB Atlas dashboard to see it stored

## Troubleshooting

**"MongoDB connection failed"**
- Check `MONGODB_URI` is set correctly in environment variables
- Verify username/password in connection string
- Check IP whitelist in MongoDB Atlas (should allow 0.0.0.0)

**Messages not appearing**
- Check browser console for errors
- Check Vercel logs: Settings → Function Logs
- Verify collection name is `messages` or `login_logs`

**Performance**
- Use MongoDB Atlas indexes (already created automatically)
- Free tier supports ~512MB of data

## Security Notes
- Never commit `.env.local` to GitHub
- Use strong passwords for MongoDB
- Enable IP whitelist in MongoDB (or allow all for testing)
- In production, restrict access by IP if possible
