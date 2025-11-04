const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat completion endpoint using OpenRouter
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'meta-llama/llama-3.2-3b-instruct:free' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model,
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
          'X-Title': 'Voice AI Widget'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    res.json({ message: aiMessage });

  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Text-to-speech endpoint using Eleven Labs
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceId = '21m00Tcm4TlvDq8ikWAM' } = req.body; // Rachel voice as default

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'Eleven Labs API key not configured' });
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert audio to base64 for easy transmission
    const audioBase64 = Buffer.from(response.data).toString('base64');
    res.json({ 
      audio: audioBase64,
      contentType: 'audio/mpeg'
    });

  } catch (error) {
    console.error('Eleven Labs API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Voice AI Widget Backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
