# API Documentation

## Endpoints:

### POST /api/chat
Request: { messages: [{role: 'user', content: 'Hello'}] }
Response: { message: 'AI response text' }

### POST /api/tts
Request: { text: 'Hello world' }
Response: { audio: 'base64-encoded-audio', contentType: 'audio/mpeg' }

### GET /health
Response: { status: 'ok', timestamp: '...' }
