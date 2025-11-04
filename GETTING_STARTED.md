# Getting Started

## Step 1: Setup Backend
1. cd backend
2. npm install
3. Copy .env.example to .env
4. Add your API keys to .env
5. npm start (for local testing)

## Step 2: Deploy to Railway
1. railway login
2. railway init
3. railway up
4. Set environment variables in Railway dashboard

## Step 3: Setup Frontend
1. cd frontend/widget
2. npm install
3. Update src/App.tsx with your Railway URL
4. npm run build

## Step 4: Embed Widget
1. Host the dist/ files on a CDN or web server
2. Add embed code to your website (see docs/EMBEDDING.md)

## Step 5: Test
1. Open your website
2. Click the chat icon
3. Try voice or text input
4. Verify AI response and audio playback
