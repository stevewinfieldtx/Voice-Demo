# Quick Start Guide

This guide will get you up and running with the Voice AI Widget in under 5 minutes.

## Step 1: Get API Keys (2 minutes)

1. Get OpenRouter API key: https://openrouter.ai
2. Get Eleven Labs API key: https://elevenlabs.io

## Step 2: Setup Backend (1 minute)

```bash
# Navigate to backend
cd backend

# Install dependencies (Railway will do this automatically)
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API keys:
OPENROUTER_API_KEY=sk-or-v1-...
ELEVENLABS_API_KEY=...
PORT=3000
```

## Step 3: Deploy to Railway (2 minutes)

1. Push your code to GitHub
2. Go to https://railway.app
3. Click "New Project" > "Deploy from GitHub repo"
4. Select your repository
5. Go to Variables tab and add:
   - OPENROUTER_API_KEY
   - ELEVENLABS_API_KEY
6. Deploy automatically starts
7. Copy your Railway URL (e.g., https://your-app.railway.app)

## Step 4: Build & Deploy Frontend

```bash
# Navigate to frontend
cd frontend/widget

# Install dependencies
npm install

# Update API URL (optional for local dev)
# Create .env file
echo "VITE_API_URL=https://your-app.railway.app" > .env

# Build for production
npm run build

# The dist/ folder contains your widget files
# Upload to any CDN or web host
```

## Step 5: Embed on Your Website

Add this code to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your content here -->
    
    <!-- Voice AI Widget -->
    <div id="voice-widget-root"></div>
    
    <script>
        window.VOICE_WIDGET_CONFIG = {
            apiUrl: 'https://your-app.railway.app'
        };
    </script>
    
    <link rel="stylesheet" href="https://your-cdn.com/voice-widget.css">
    <script type="module" src="https://your-cdn.com/voice-widget.js"></script>
</body>
</html>
```

## Local Development

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Terminal 2 - Frontend
```bash
cd frontend/widget
npm install
npm run dev
# Runs on http://localhost:5173
```

Open http://localhost:5173 and test the widget!

## Testing

1. Click the blue chat button (bottom-right)
2. Click microphone icon to speak
3. Or type a message
4. Watch AI respond with text and voice

## Browser Requirements

- Voice input: Chrome, Edge, or Safari
- Text input: All modern browsers

## Troubleshooting

### Backend issues:
- Check .env file has correct API keys
- Visit http://localhost:3000/health
- Check console for errors

### Frontend issues:
- Verify API URL is correct
- Check browser console for errors
- Try different browser for voice

### API errors:
- Verify API keys are valid
- Check you have credits/quota
- Review Railway logs

## Next Steps

- Read docs/DEPLOYMENT.md for detailed Railway setup
- Read docs/EMBEDDING.md for advanced embedding options
- Customize the widget styling to match your brand

## Support

Check the main README.md for:
- API endpoints documentation
- Browser compatibility details
- Security best practices
- Advanced configuration options
