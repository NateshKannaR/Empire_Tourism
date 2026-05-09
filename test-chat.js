const testChat = async () => {
  const apiKey = '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';
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://smarttrip-ai.com',
        'X-Title': 'SmartTrip AI',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant for SmartTrip AI. Help users with packing advice, travel tips, destination information, and trip planning. Be concise, friendly, and practical. Keep responses under 150 words.'
          },
          {
            role: 'user',
            content: 'What should I pack for a beach trip?'
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.choices && data.choices[0]) {
      console.log('\n✅ SUCCESS! Bot response:');
      console.log(data.choices[0].message.content);
    } else {
      console.log('\n❌ ERROR: No response from bot');
      console.log('Full data:', data);
    }
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
};

testChat();
