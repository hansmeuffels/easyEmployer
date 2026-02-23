function cleanToken(raw) {
  if (!raw) return raw;
  let t = raw.trim();
  t = t.replace(/^\{/, '').replace(/\}$/, '').trim();
  t = t.replace(/^["']?access_token["']?\s*:\s*/i, '').trim();
  t = t.replace(/^["']/, '').replace(/["'],?\s*$/, '').trim();
  return t;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken: rawToken } = req.body;
  const accessToken = cleanToken(rawToken);

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is vereist' });
  }

  const apiUrl = 'https://api.loket-ontw.nl/v2/providers/';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return res.status(response.status).json({
      status: response.status,
      data,
    });
  } catch (error) {
    console.error('Get providers failed:', error);
    return res.status(500).json({
      error: 'Fout bij het ophalen van providers',
      details: error.message,
    });
  }
}
