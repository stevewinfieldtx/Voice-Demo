# Railway Deployment Guide for Voice AI Widget

This guide will walk you through deploying the Voice AI Widget backend to Railway.

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- OpenRouter API key (get from https://openrouter.ai)
- Eleven Labs API key (get from https://elevenlabs.io)

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Create a new GitHub repository
2. Push your code to the repository:

```bash
cd voice-ai-widget
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Create a Railway Project

1. Go to https://railway.app and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your voice-ai-widget repository
5. Railway will automatically detect the Node.js project

### Step 3: Configure Environment Variables

1. In your Railway project dashboard, go to the "Variables" tab
2. Add the following environment variables:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=3000
APP_URL=your_railway_app_url
```

Note: The APP_URL will be available after the first deployment. You can update it later.

### Step 4: Configure Build Settings

Railway should automatically detect the configuration from railway.json. If needed, you can manually set:

- **Root Directory**: Leave empty or set to `/`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### Step 5: Deploy

1. Click "Deploy" or push a new commit to trigger deployment
2. Railway will:
   - Install dependencies
   - Start the server
   - Generate a public URL

### Step 6: Get Your Deployment URL

1. Once deployed, Railway will provide a URL like: `https://your-app.up.railway.app`
2. Update the `APP_URL` environment variable with this URL
3. Test the deployment by visiting: `https://your-app.up.railway.app/health`

### Step 7: Update Frontend Configuration

Update your frontend widget to use the Railway backend URL:

1. In your widget embedding code, set the API URL:

```html
<script>
  window.VOICE_WIDGET_CONFIG = {
    apiUrl: 'https://your-app.up.railway.app'
  };
</script>
```

## Verify Deployment

Test your endpoints:

1. **Health Check**:
```bash
curl https://your-app.up.railway.app/health
```

2. **Chat Endpoint**:
```bash
curl -X POST https://your-app.up.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

3. **TTS Endpoint**:
```bash
curl -X POST https://your-app.up.railway.app/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world"}'
```

## Monitoring and Logs

1. In Railway dashboard, go to the "Deployments" tab
2. Click on any deployment to view logs
3. Monitor for errors and performance issues

## Updating Your Deployment

To update your deployment:

1. Make changes to your code
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update message"
git push
```
3. Railway will automatically redeploy

## Troubleshooting

### Build Fails

- Check that all dependencies are in package.json
- Verify Node.js version compatibility (requires >=18.0.0)
- Check Railway build logs for specific errors

### Server Starts But Crashes

- Verify environment variables are set correctly
- Check that PORT environment variable is set to 3000
- Review server logs in Railway dashboard

### API Endpoints Return Errors

- Verify API keys are valid
- Check that CORS is enabled (already configured in server.js)
- Ensure the APP_URL environment variable is set correctly

### CORS Issues

The backend is configured to allow requests from any origin. If you experience CORS issues:

1. Check that the backend URL is correct
2. Verify the request headers include 'Content-Type: application/json'
3. Check Railway logs for specific CORS errors

## Cost Considerations

Railway offers:
- Free tier: $5 credit per month (sufficient for testing)
- Pay-as-you-go: Usage-based pricing after free tier

Monitor your usage in the Railway dashboard to avoid unexpected charges.

## Security Best Practices

1. Never commit API keys to your repository
2. Use Railway's environment variables for all secrets
3. Regularly rotate API keys
4. Monitor API usage to detect abuse
5. Consider adding rate limiting for production use

## Support

- Railway Documentation: https://docs.railway.app
- OpenRouter Documentation: https://openrouter.ai/docs
- Eleven Labs Documentation: https://elevenlabs.io/docs

## Next Steps

After successful deployment:
1. Test all endpoints thoroughly
2. Update your frontend widget configuration
3. Follow the EMBEDDING.md guide to add the widget to your website
