export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, ...body } = req.body;

  try {
if (type === 'image') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다' });
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt: body.prompt,
          n: 1,
          size: '1536x1024',
          quality: 'standard'
        }),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

if (type === 'image') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다' });
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: body.model || 'dall-e-3',
          prompt: body.prompt,
          n: 1,
          size: '1792x1024',
          quality: 'standard'
        }),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(400).json({ error: 'type 파라미터가 필요합니다' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
