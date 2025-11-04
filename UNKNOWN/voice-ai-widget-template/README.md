# Voice AI Widget

A voice-enabled AI conversation widget that can be embedded on any website.

## Features
- Voice input (Web Speech API)
- Text input
- AI responses via OpenRouter
- Text-to-speech via Eleven Labs
- Embeddable on any website

## Project Structure
- `/backend` - Node.js/Express API server
- `/frontend/widget` - React widget application
- `/docs` - Documentation

## Quick Start
1. Deploy backend to Railway (see docs/DEPLOYMENT.md)
2. Build frontend widget (cd frontend/widget && npm run build)
3. Embed on your website (see docs/EMBEDDING.md)

## Requirements
- Node.js 18+
- OpenRouter API key
- Eleven Labs API key
- Railway account (for deployment)
