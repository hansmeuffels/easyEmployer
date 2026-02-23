import { cleanToken } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken: rawToken, employerId } = req.body;
  const accessToken = cleanToken(rawToken);

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is vereist' });
  }

  if (!employerId) {
    return res.status(400).json({ error: 'Employer ID is vereist' });
  }

  const apiUrl = `https://api.loket-ontw.nl/v2/providers/employers/${employerId}/conceptemployees/metadata`;

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
    console.error('Get metadata failed:', error);
    return res.status(500).json({
      error: 'Fout bij het ophalen van metadata',
      details: error.message,
    });
  }
}
