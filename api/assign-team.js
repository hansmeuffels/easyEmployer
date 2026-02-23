import { cleanToken } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken: rawToken, employerId, teamIds, providerId } = req.body;
  const accessToken = cleanToken(rawToken);

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is vereist' });
  }

  if (!employerId) {
    return res.status(400).json({ error: 'Employer ID is vereist' });
  }

  if (!providerId) {
    return res.status(400).json({ error: 'Provider ID is vereist' });
  }

  if (!teamIds || !Array.isArray(teamIds) || teamIds.length === 0) {
    return res.status(400).json({ error: 'Minstens één team ID is vereist' });
  }

  const apiUrl = `https://api.loket-ontw.nl/v2/providers/${providerId}/employers/${employerId}/authorizationGroups`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(teamIds),
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
    console.error('API call failed:', error);
    return res.status(500).json({
      error: 'Fout bij het aanroepen van de API',
      details: error.message,
    });
  }
}
