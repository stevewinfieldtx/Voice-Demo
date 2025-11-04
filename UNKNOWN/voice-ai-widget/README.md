# Voice AI Conversation Widget

An embeddable web widget that enables natural voice conversations with an AI assistant. Built with React for the frontend and Node.js/Express for the backend, designed for easy deployment on Railway.

## Features

- Voice input using browser's Web Speech API
- Text input as an alternative to voice
- AI-powered conversations via OpenRouter
- Natural voice responses using Eleven Labs text-to-speech
- Conversation history display
- Compact, embeddable widget design
- CORS-enabled backend for cross-origin requests
- Easy Railway deployment

## Project Structure

```
voice-ai-widget/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               
│   └── widget/             # React widget
│       ├── src/
│       │   ├── App.tsx
│       │   └── components/
│       │       └── VoiceWidget.tsx
│       ├── public/
│       │   └── demo.html   # Demo page
│       └── package.json
├── docs/
│   ├── DEPLOYMENT.md       # Railway deployment guide
│   └── EMBEDDING.md        # Widget embedding instructions
├── railway.json            # Railway configuration
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key (get from https://openrouter.ai)
- Eleven Labs API key (get from https://elevenlabs.io)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
OPENROUTER_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
PORT=3000
```

5. Start the server:
```bash
npm start
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/widget
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The widget will run on http://localhost:5173

### Testing Locally

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Click the chat button in the bottom-right corner
4. Try voice or text input

## Deployment

### Backend Deployment to Railway

Follow the step-by-step guide in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for deploying the backend to Railway.

Quick summary:
1. Push code to GitHub
2. Create Railway project from GitHub repo
3. Add environment variables (API keys)
4. Deploy automatically
5. Get your Railway URL

### Frontend Deployment

Build the widget for production:

```bash
cd frontend/widget
npm run build
```

The built files in `dist/` can be:
- Hosted on any CDN (Cloudflare, Netlify, Vercel)
- Served from your own web server
- Embedded directly in your website

## Embedding the Widget

Follow the detailed guide in [docs/EMBEDDING.md](docs/EMBEDDING.md) for embedding instructions.

Quick embed code:

```html
<!-- Add to your HTML before closing body tag -->
<div id="voice-widget-root"></div>

<script>
    window.VOICE_WIDGET_CONFIG = {
        apiUrl: 'https://your-railway-app.railway.app'
    };
</script>

<link rel="stylesheet" href="/path/to/voice-widget.css">
<script type="module" src="/path/to/voice-widget.js"></script>
```

## API Endpoints

### POST /api/chat

Send messages to AI assistant.

Request:
```json
{
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi there!"},
    {"role": "user", "content": "How are you?"}
  ],
  "model": "meta-llama/llama-3.2-3b-instruct:free"
}
```

Response:
```json
{
  "message": "I'm doing well, thank you for asking!"
}
```

### POST /api/tts

Convert text to speech.

Request:
```json
{
  "text": "Hello, how can I help you?",
  "voiceId": "21m00Tcm4TlvDq8ikWAM"
}
```

Response:
```json
{
  "audio": "base64_encoded_audio_data",
  "contentType": "audio/mpeg"
}
```

### GET /health

Health check endpoint.

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-04T12:57:44.000Z"
}
```

## Browser Compatibility

- Chrome 25+ (full support including voice)
- Edge 79+ (full support including voice)
- Safari 14.1+ (full support including voice)
- Firefox (text input only, voice not supported)
- Opera 27+ (full support including voice)

## Technology Stack

### Backend
- Node.js with Express
- Axios for HTTP requests
- CORS middleware
- dotenv for environment variables

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- Web Speech API for voice recognition
- HTML5 Audio API for playback

### APIs
- OpenRouter for AI chat completions
- Eleven Labs for text-to-speech

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend/widget
npm run dev  # Vite dev server with HMR
```

## Configuration

### Backend Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required)
- `ELEVENLABS_API_KEY`: Your Eleven Labs API key (required)
- `PORT`: Server port (default: 3000)
- `APP_URL`: Your application URL for OpenRouter referer

### Frontend Environment Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

## Security

- API keys stored in environment variables (never in code)
- CORS enabled for cross-origin requests
- Backend proxies all API calls to keep keys secure
- HTTPS required for production deployment

## Troubleshooting

### Voice Input Not Working
- Check browser supports Speech Recognition API
- Verify microphone permissions granted
- Try Chrome or Edge for best compatibility

### API Errors
- Verify backend is running
- Check API keys are set correctly
- Review Railway logs for backend errors
- Confirm CORS is enabled

### Widget Not Appearing
- Check browser console for errors
- Verify script and CSS files loading
- Confirm configuration set before scripts load

## License

MIT License

## Support

For issues and questions:
1. Check the troubleshooting sections in documentation
2. Review browser and server console logs
3. Verify all configuration settings
4. Test in different browsers

## Credits

Built by MiniMax Agent

Powered by:
- OpenRouter for AI capabilities
- Eleven Labs for voice synthesis
- Railway for hosting
