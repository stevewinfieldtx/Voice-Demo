# Environment Variables Configuration

This document explains all environment variables used in the Voice AI Widget backend.

## Required Variables

### OPENROUTER_API_KEY
- **Description**: Your OpenRouter API key for AI chat completions
- **Get it from**: https://openrouter.ai
- **Example**: `sk-or-v1-xxxxxxxxxxxxxxxxxxxxx`

### ELEVENLABS_API_KEY
- **Description**: Your Eleven Labs API key for text-to-speech
- **Get it from**: https://elevenlabs.io
- **Example**: `sk_xxxxxxxxxxxxxxxxxxxxxxxx`

## Server Configuration

### PORT
- **Description**: Port number for the Express server
- **Default**: `3000`
- **Railway**: Automatically set by Railway (don't override)

### APP_URL
- **Description**: Your application URL (used for CORS and OpenRouter referrer)
- **Development**: `http://localhost:3000`
- **Production**: Your Railway URL (e.g., `https://your-app.up.railway.app`)

## AI Model Configuration

### OPENROUTER_MODEL
- **Description**: The AI model to use for chat completions
- **Default**: `meta-llama/llama-3.2-3b-instruct:free`
- **Options**: See https://openrouter.ai/models for full list

#### Popular OpenRouter Models:

**Free Models:**
- `meta-llama/llama-3.2-3b-instruct:free` - Fast, free (default)
- `google/gemma-2-9b-it:free` - Good quality, free
- `mistralai/mistral-7b-instruct:free` - Balanced, free

**Paid Models (Better Quality):**
- `anthropic/claude-3.5-sonnet` - Excellent reasoning and coding
- `openai/gpt-4o` - Latest GPT-4 Optimized
- `openai/gpt-4-turbo` - Powerful, multimodal
- `google/gemini-pro-1.5` - Google's best model
- `meta-llama/llama-3.1-70b-instruct` - Very capable, good value

**Budget-Friendly Paid:**
- `openai/gpt-3.5-turbo` - Fast and affordable
- `anthropic/claude-3-haiku` - Quick responses, low cost
- `meta-llama/llama-3.1-8b-instruct` - Good performance/cost ratio

To change the model, update your `.env` file:
```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

## Voice Configuration

### ELEVENLABS_VOICE_ID
- **Description**: Voice ID for text-to-speech conversion
- **Default**: `21m00Tcm4TlvDq8ikWAM` (Rachel - warm, friendly female voice)

#### Popular Eleven Labs Voices:

**Female Voices:**
- `21m00Tcm4TlvDq8ikWAM` - Rachel (default) - Calm, clear
- `EXAVITQu4vr4xnSDxMaL` - Bella - Soft, soothing
- `MF3mGyEYCl7XYWbV9V6O` - Elli - Young, energetic
- `jsCqWAovK2LkecY7zXl4` - Freya - Expressive, warm
- `ThT5KcBeYPX3keUQqHPh` - Dorothy - Professional, mature

**Male Voices:**
- `VR6AewLTigWG4xSOukaG` - Arnold - Deep, authoritative
- `pNInz6obpgDQGcFmaJgB` - Adam - Clear, professional
- `yoZ06aMxZJJ28mfd3POQ` - Sam - Warm, conversational
- `N2lVS1w4EtoT3dr4eOWO` - Callum - British accent, calm

**Character/Accent Voices:**
- `IKne3meq5aSn9XLyUdCD` - Charlie - Australian accent
- `XB0fDUnXU5powFXDhCwa` - Charlotte - British accent
- `TxGEqnHWrfWFTfGW9XjX` - Josh - American, enthusiastic

To see all available voices, visit: https://elevenlabs.io/voices

To change the voice, update your `.env` file:
```env
ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB
```

## Development vs Production

### Development (.env)
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
ELEVENLABS_API_KEY=sk_xxxxx
PORT=3000
APP_URL=http://localhost:3000
OPENROUTER_MODEL=meta-llama/llama-3.2-3b-instruct:free
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

### Production (Railway Dashboard)
Set these in Railway's environment variables:
```
OPENROUTER_API_KEY=sk-or-v1-xxxxx
ELEVENLABS_API_KEY=sk_xxxxx
APP_URL=https://your-app.up.railway.app
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

Note: Railway automatically sets PORT, don't override it.

## Testing Different Configurations

You can test different models and voices without code changes:

```bash
# Test with GPT-4
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "openai/gpt-4o"
  }'

# Test with different voice
curl -X POST http://localhost:3000/api/tts \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world",
    "voiceId": "pNInz6obpgDQGcFmaJgB"
  }'
```

## Cost Considerations

### Free Tier
Using free models and default settings:
- OpenRouter: Free tier available
- Eleven Labs: 10,000 characters/month free

### Paid Usage
- OpenRouter: Pay per token (varies by model)
- Eleven Labs: Pay per character after free tier

Monitor your usage:
- OpenRouter: https://openrouter.ai/activity
- Eleven Labs: https://elevenlabs.io/usage

## Security Best Practices

1. **Never commit .env file** - Add to .gitignore
2. **Rotate API keys regularly** - Change keys every 3-6 months
3. **Use free models for development** - Save costs while testing
4. **Monitor API usage** - Set up billing alerts
5. **Use environment-specific keys** - Different keys for dev/prod

## Troubleshooting

### "Model not found" error
- Check model name is correct (case-sensitive)
- Verify you have access to that model on OpenRouter
- Some models require payment

### "Invalid voice ID" error
- Check voice ID is correct
- Voice might have been removed from Eleven Labs
- Try the default Rachel voice first

### High API costs
- Switch to free models for development
- Use cheaper models for production
- Implement caching to reduce API calls
- Add rate limiting to prevent abuse
