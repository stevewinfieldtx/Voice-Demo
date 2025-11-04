import VoiceWidget from './components/VoiceWidget'

function App() {
  // Get API URL from environment or use default
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-gray-100">
      <VoiceWidget apiUrl={apiUrl} />
    </div>
  )
}

export default App
