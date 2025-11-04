# Voice AI Widget - Getting Started with Railway Deployment

## Overview

This Voice AI Widget consists of two parts:
1. **Frontend**: React widget (already deployed at https://dmqro8rhxb6u.space.minimax.io)
2. **Backend**: Node.js/Express API server (for you to deploy on Railway)

## IMPORTANT: Backend Deployment Required

The frontend widget is deployed and working, but **cannot function without the backend API**. You need to deploy the Express backend to Railway to complete the setup.

## Backend Deployment Steps

### 1. Get API Keys
- **OpenRouter API Key**: Visit https://openrouter.ai, create account, get API key
- **Eleven Labs API Key**: Visit https://elevenlabs.io, create account, get API key

### 2. Deploy to Railway

#### Option A: Railway CLI (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to backend directory
cd voice-ai-widget/backend

# Deploy
railway deploy
```

#### Option B: Railway Web Interface
1. Go to https://railway.app and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. Set root directory to `backend/`
5. Railway will auto-detect Node.js and deploy

### 3. Configure Environment Variables

In Railway dashboard, go to your project → Variables tab and add:

```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
ELEVENLABS_API_KEY=sk_your-key-here
PORT=3000
APP_URL=https://your-railway-app.railway.app
```

### 4. Update Frontend Configuration

After backend deployment, you'll get a Railway URL like `https://your-app.railway.app`

Update the frontend to use this URL:
1. Edit `frontend/widget/src/App.tsx`
2. Change the apiUrl to your Railway URL:
   ```typescript
   const apiUrl = 'https://your-railway-app.railway.app';
   ```
3. Rebuild and redeploy frontend (or set VITE_API_URL environment variable)

## Testing

Once both frontend and backend are deployed:

1. Visit the frontend URL: https://dmqro8rhxb6u.space.minimax.io
2. Click the chat icon to open the widget
3. Try voice input (click microphone) or type a message
4. Verify AI response and voice playback work

## Files Structure

### Backend (Node.js/Express)
```
backend/
├── server.js          # Main Express server
├── package.json       # Dependencies & scripts
└── .env.example       # Environment template
```

### Key Backend Endpoints
- `GET /health` - Health check
- `POST /api/chat` - AI chat completions (OpenRouter)
- `POST /api/tts` - Text-to-speech (Eleven Labs)

### Frontend (React Widget)
- Already deployed and configured for Railway backend
- Responsive design with voice + text input
- Real-time conversation display
- Audio playback for AI responses

## Troubleshooting

### Common Issues
1. **Widget loads but no AI response**: Backend not deployed or wrong API URL
2. **CORS errors**: Check APP_URL environment variable matches your frontend domain
3. **Voice recognition not working**: Use HTTPS (required for Web Speech API)
4. **Audio not playing**: Check Eleven Labs API key and browser audio permissions

### Support
- Backend logs: Check Railway deployment logs
- Frontend logs: Open browser DevTools → Console
- API testing: Use tools like Postman to test backend endpoints directly

## Success Criteria ✅

When everything is working correctly:
- ✅ Widget opens and displays chat interface
- ✅ Voice input transcribes speech to text
- ✅ AI responds to messages appropriately
- ✅ Audio playback works for AI responses
- ✅ No console errors in browser DevTools