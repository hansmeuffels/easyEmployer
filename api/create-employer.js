import { cleanToken } from './_shared.js';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken: rawToken, payload, providerId } = req.body;
  const accessToken = cleanToken(rawToken);

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is vereist' });
  }

  if (!payload) {
    return res.status(400).json({ error: 'Payload is vereist' });
  }

  if (!providerId) {
    return res.status(400).json({ error: 'Provider ID is vereist' });
  }

  const apiUrl =
    `https://api.loket-ontw.nl/v2/providers/${providerId}/employers`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
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
      location: response.headers.get('location') || null,
    });
  } catch (error) {
    console.error('API call failed:', error);
    return res.status(500).json({
      error: 'Fout bij het aanroepen van de API',
      details: error.message,
    });
  }
}
