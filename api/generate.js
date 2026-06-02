module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body) return res.status(400).json({ error: 'Request body가 없습니다' });

  const { type, ...rest } = body;

  try {
    if (type === 'copy') {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'Claude API 키가 설정되지 않았습니다' });
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(rest),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (type === 'image') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'OpenAI API 키가 설정되지 않았습니다' });

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'chatgpt-image-latest',
          prompt: rest.prompt,
          n: 1,
          size: rest.size || '1536x1024',
          quality: 'medium'
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: data.error?.message || JSON.stringify(data)
        });
      }
      if (data.data && data.data[0] && data.data[0].b64_json) {
        data.data[0].url = 'data:image/png;base64,' + data.data[0].b64_json;
        delete data.data[0].b64_json;
      }
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'type은 copy 또는 image 여야 합니다' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
