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
        const { messages, model = 'meta-llama/llama-3.2-3b-instruct:free' } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            throw new Error('Messages array is required');
        }

        const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
        if (!OPENROUTER_API_KEY) {
            throw new Error('OpenRouter API key not configured');
        }

        // Call OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://voice-ai-widget.minimax.io',
                'X-Title': 'Voice AI Widget'
            },
            body: JSON.stringify({
                model: model,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`OpenRouter API error: ${errorData}`);
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        return new Response(JSON.stringify({ 
            data: { message: aiMessage }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Chat error:', error);

        const errorResponse = {
            error: {
                code: 'CHAT_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
