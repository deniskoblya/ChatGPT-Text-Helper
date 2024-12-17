// ChatGPT API integration
export async function generateText(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate text');
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}