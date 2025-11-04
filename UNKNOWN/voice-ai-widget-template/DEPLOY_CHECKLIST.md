# Deployment Checklist

## Pre-deployment
- [ ] Get OpenRouter API key
- [ ] Get Eleven Labs API key
- [ ] Create Railway account
- [ ] Install Railway CLI

## Backend Deployment
- [ ] Deploy backend to Railway
- [ ] Set OPENROUTER_API_KEY in Railway
- [ ] Set ELEVENLABS_API_KEY in Railway
- [ ] Set PORT to 3000
- [ ] Set APP_URL to Railway URL
- [ ] Test /health endpoint
- [ ] Test /api/chat endpoint
- [ ] Test /api/tts endpoint

## Frontend Deployment
- [ ] Update API URL in App.tsx
- [ ] Build production bundle
- [ ] Host files on CDN/web server
- [ ] Test widget loads correctly

## Testing
- [ ] Voice input works
- [ ] Text input works
- [ ] AI responses appear
- [ ] Audio playback works
- [ ] No console errors
- [ ] Works on mobile browsers
