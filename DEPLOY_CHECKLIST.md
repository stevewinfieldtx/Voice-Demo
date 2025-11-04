# Deployment Checklist

Use this checklist to ensure proper deployment of the Voice AI Widget.

## Pre-Deployment

- [ ] OpenRouter API key obtained
- [ ] Eleven Labs API key obtained
- [ ] Code pushed to GitHub repository
- [ ] Railway account created

## Backend Deployment

- [ ] Railway project created from GitHub repo
- [ ] Environment variables set in Railway:
  - [ ] OPENROUTER_API_KEY
  - [ ] ELEVENLABS_API_KEY
  - [ ] PORT (set to 3000)
  - [ ] APP_URL (your Railway URL)
- [ ] Backend deployed successfully
- [ ] Railway URL obtained
- [ ] Health endpoint tested: /health
- [ ] Chat endpoint tested: POST /api/chat
- [ ] TTS endpoint tested: POST /api/tts

## Frontend Build

- [ ] Dependencies installed: npm install
- [ ] Environment variable set: VITE_API_URL
- [ ] Production build created: npm run build
- [ ] Build output verified in dist/ folder
- [ ] No build errors or warnings

## Frontend Deployment

- [ ] CDN or hosting service selected
- [ ] Widget files uploaded (voice-widget.js, voice-widget.css)
- [ ] Files accessible via public URL
- [ ] CORS configured if needed

## Integration Testing

- [ ] Widget loads on test page
- [ ] Chat button visible in bottom-right
- [ ] Widget opens when clicked
- [ ] Voice recording works (Chrome/Edge/Safari)
- [ ] Text input works
- [ ] AI responses appear correctly
- [ ] Audio playback works
- [ ] Conversation history displays
- [ ] Error handling works gracefully

## Browser Testing

- [ ] Chrome (voice + text)
- [ ] Edge (voice + text)
- [ ] Safari (voice + text)
- [ ] Firefox (text only)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Security Check

- [ ] API keys not exposed in frontend code
- [ ] HTTPS used for all requests
- [ ] CORS properly configured
- [ ] Environment variables secure

## Performance Check

- [ ] Widget loads quickly
- [ ] No console errors
- [ ] Audio loads without significant delay
- [ ] Smooth conversation flow

## Documentation

- [ ] Railway URL documented
- [ ] CDN URLs documented
- [ ] Embedding instructions prepared
- [ ] API endpoint documentation reviewed

## Post-Deployment

- [ ] Monitor Railway logs for errors
- [ ] Check API usage and costs
- [ ] Test from different networks
- [ ] Verify on production website

## Monitoring Setup

- [ ] Railway monitoring dashboard reviewed
- [ ] Error logging configured
- [ ] Usage tracking in place
- [ ] Cost alerts configured (if needed)

## Known Issues Documented

- [ ] Browser compatibility notes shared
- [ ] Voice input limitations documented
- [ ] Troubleshooting guide available
- [ ] Support contact information provided

## Final Verification

- [ ] End-to-end test completed
- [ ] User acceptance testing done
- [ ] Production ready confirmation
- [ ] Rollback plan prepared

---

Deployment Date: _______________
Deployed By: _______________
Railway URL: _______________
Widget CDN URL: _______________

Notes:
_________________________________
_________________________________
_________________________________
