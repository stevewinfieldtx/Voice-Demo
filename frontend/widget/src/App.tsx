import VoiceWidget from './components/VoiceWidget'

function App() {
  // Get API URL from environment or use Railway default
  const apiUrl = import.meta.env.VITE_API_URL || 'https://your-railway-app.railway.app';

  return (
    <div className="min-h-screen bg-gray-100">
      <VoiceWidget apiUrl={apiUrl} />
    </div>
  )
}

export default App
