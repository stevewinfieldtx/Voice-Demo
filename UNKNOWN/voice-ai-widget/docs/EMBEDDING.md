# Widget Embedding Guide

This guide explains how to embed the Voice AI Widget on any website.

## Quick Start

Add this code to any HTML page where you want the widget to appear:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <!-- Your website content here -->
    
    <!-- Voice AI Widget -->
    <div id="voice-widget-root"></div>
    
    <!-- Widget Configuration -->
    <script>
        window.VOICE_WIDGET_CONFIG = {
            apiUrl: 'https://your-railway-app.railway.app'
        };
    </script>
    
    <!-- Widget Script -->
    <link rel="stylesheet" href="https://your-cdn-url/voice-widget.css">
    <script type="module" src="https://your-cdn-url/voice-widget.js"></script>
</body>
</html>
```

## Detailed Setup

### Step 1: Build the Widget

1. Navigate to the frontend directory:
```bash
cd frontend/widget
```

2. Install dependencies:
```bash
npm install
```

3. Create a production build:
```bash
npm run build
```

The build output will be in `frontend/widget/dist/`

### Step 2: Host the Widget Files

You have several options for hosting the widget files:

#### Option A: Use a CDN (Recommended for Production)

1. Upload the contents of `dist/` to a CDN service like:
   - Cloudflare Pages
   - Netlify
   - Vercel
   - AWS S3 + CloudFront

2. Use the CDN URLs in your embed code

#### Option B: Self-Host

1. Copy the `dist/` folder to your web server
2. Serve the files from your domain
3. Ensure proper CORS headers are set

#### Option C: Local Development

For testing, you can run the development server:
```bash
npm run dev
```

### Step 3: Configure the Widget

The widget accepts the following configuration options:

```javascript
window.VOICE_WIDGET_CONFIG = {
    // Required: Your Railway backend URL
    apiUrl: 'https://your-railway-app.railway.app',
    
    // Optional: Customize appearance (future enhancement)
    // theme: 'light',
    // position: 'bottom-right'
};
```

### Step 4: Add to Your Website

#### For Static HTML Sites

Add the widget code before the closing `</body>` tag:

```html
<!-- Widget Container -->
<div id="voice-widget-root"></div>

<!-- Configuration -->
<script>
    window.VOICE_WIDGET_CONFIG = {
        apiUrl: 'https://your-railway-app.railway.app'
    };
</script>

<!-- Widget Files -->
<link rel="stylesheet" href="/path/to/voice-widget.css">
<script type="module" src="/path/to/voice-widget.js"></script>
```

#### For WordPress Sites

1. Install a plugin like "Insert Headers and Footers"
2. Add the widget code to the footer
3. Save changes

#### For React/Next.js Sites

1. Create a component to load the widget:

```tsx
// components/VoiceWidget.tsx
import { useEffect } from 'react';

export default function VoiceWidget() {
  useEffect(() => {
    // Set configuration
    (window as any).VOICE_WIDGET_CONFIG = {
      apiUrl: 'https://your-railway-app.railway.app'
    };

    // Load widget script
    const script = document.createElement('script');
    script.src = '/voice-widget.js';
    script.type = 'module';
    document.body.appendChild(script);

    // Load widget styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/voice-widget.css';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return <div id="voice-widget-root" />;
}
```

2. Add the component to your layout:

```tsx
import VoiceWidget from '@/components/VoiceWidget';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <VoiceWidget />
    </>
  );
}
```

#### For Vue.js Sites

1. Create a component:

```vue
<!-- components/VoiceWidget.vue -->
<template>
  <div id="voice-widget-root"></div>
</template>

<script>
export default {
  name: 'VoiceWidget',
  mounted() {
    window.VOICE_WIDGET_CONFIG = {
      apiUrl: 'https://your-railway-app.railway.app'
    };

    const script = document.createElement('script');
    script.src = '/voice-widget.js';
    script.type = 'module';
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/voice-widget.css';
    document.head.appendChild(link);
  }
};
</script>
```

2. Add to your App.vue or layout component

## Browser Compatibility

The widget requires:
- Modern browser with ES6 support
- Speech Recognition API (Chrome, Edge, Safari)
- Audio playback support

### Browser Support

- Chrome 25+
- Edge 79+
- Safari 14.1+
- Firefox: Voice input not supported (text input works)
- Opera 27+

## Testing the Widget

### 1. Test Voice Input

1. Click the microphone button
2. Allow microphone access when prompted
3. Speak your message
4. Verify text appears in input field

### 2. Test Text Input

1. Type a message in the input field
2. Click send button
3. Verify AI response appears
4. Listen for audio playback

### 3. Test Conversation Flow

1. Send multiple messages
2. Verify conversation history displays correctly
3. Check that context is maintained

## Troubleshooting

### Widget Not Appearing

1. Check browser console for errors
2. Verify script and CSS files are loading
3. Confirm `voice-widget-root` div exists
4. Check that configuration is set before script loads

### Voice Input Not Working

1. Verify microphone permissions are granted
2. Check browser supports Speech Recognition API
3. Try in Chrome or Edge (best support)
4. Check console for specific errors

### API Errors

1. Verify Railway backend is running
2. Check API URL in configuration
3. Confirm CORS is enabled on backend
4. Verify API keys are set in Railway environment

### Audio Not Playing

1. Check browser audio permissions
2. Verify Eleven Labs API is responding
3. Check console for audio loading errors
4. Try different browser

### Styling Issues

1. Verify CSS file is loading
2. Check for CSS conflicts with your site
3. Widget uses Tailwind classes (scoped to component)
4. Check z-index if widget is hidden behind other elements

## Customization

### Position

The widget appears in the bottom-right corner by default. To change position, modify the CSS in your site:

```css
#voice-widget-root > div {
    bottom: 20px !important;
    right: 20px !important;
}
```

### Colors

To match your brand colors, add custom CSS:

```css
/* Change button color */
#voice-widget-root button[aria-label="Open AI Chat"] {
    background-color: #your-color !important;
}

/* Change header color */
#voice-widget-root .bg-blue-600 {
    background-color: #your-color !important;
}
```

## Security Considerations

1. **HTTPS Required**: Widget must be served over HTTPS in production
2. **Microphone Permissions**: Users must grant permission for voice input
3. **API Keys**: Never expose API keys in frontend code
4. **Backend Proxy**: All API calls go through your Railway backend

## Performance Optimization

1. **CDN Hosting**: Use CDN for faster load times
2. **Lazy Loading**: Widget loads on demand (clicking the button)
3. **Audio Streaming**: Audio plays as soon as available
4. **Minification**: Production build is automatically minified

## Example Implementation

See the `/frontend/widget/public/demo.html` file for a complete working example.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Railway and browser console logs
3. Verify all configuration settings
4. Test in different browsers

## Next Steps

1. Deploy backend to Railway (see DEPLOYMENT.md)
2. Build and host the widget files
3. Add widget to your website
4. Test thoroughly in different browsers
5. Monitor usage and performance
