Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { text, voiceId = '21m00Tcm4TlvDq8ikWAM' } = await req.json();

        if (!text) {
            throw new Error('Text is required');
        }

        const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
        if (!ELEVENLABS_API_KEY) {
            throw new Error('Eleven Labs API key not configured');
        }

        // Call Eleven Labs API
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Eleven Labs API error: ${errorData}`);
        }

        // Get audio data as array buffer
        const audioData = await response.arrayBuffer();
        
        // Convert to base64 for JSON transmission
        const uint8Array = new Uint8Array(audioData);
        let binaryString = '';
        for (let i = 0; i < uint8Array.length; i++) {
            binaryString += String.fromCharCode(uint8Array[i]);
        }
        const audioBase64 = btoa(binaryString);

        return new Response(JSON.stringify({ 
            data: {
                audio: audioBase64,
                contentType: 'audio/mpeg'
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('TTS error:', error);

        const errorResponse = {
            error: {
                code: 'TTS_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
