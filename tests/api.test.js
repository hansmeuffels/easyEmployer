import { describe, it, expect, vi, beforeEach } from 'vitest';

// --- Mock helpers ---

/** Create a minimal Vercel-like request object */
function mockReq({ method = 'POST', body = {} } = {}) {
  return { method, body };
}

/** Create a minimal Vercel-like response object that records calls */
function mockRes() {
  const res = {
    _status: null,
    _json: null,
    status(code) {
      res._status = code;
      return res;
    },
    json(data) {
      res._json = data;
      return res;
    },
  };
  return res;
}

/** Create a mock fetch Response */
function mockFetchResponse({ status = 200, json = {}, headers = {} } = {}) {
  return {
    status,
    headers: {
      get: (name) => headers[name.toLowerCase()] || null,
    },
    json: async () => json,
    text: async () => JSON.stringify(json),
  };
}

// ============================================================
// test-token.js
// ============================================================
describe('api/test-token', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/test-token.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'GET' }), res);
    expect(res._status).toBe(405);
    expect(res._json.error).toMatch(/method not allowed/i);
  });

  it('returns 400 when accessToken is missing', async () => {
    const res = mockRes();
    await handler(mockReq({ body: {} }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/token/i);
  });

  it('calls oauth endpoint and returns data on success', async () => {
    const tokenInfo = { userName: 'test', clientId: 'c1' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 200, json: tokenInfo, headers: { 'content-type': 'application/json' } })
    ));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok123' } }), res);

    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch.mock.calls[0][0]).toBe('https://oauth.loket-ontw.nl/token/information');
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer tok123');

    expect(res._status).toBe(200);
    expect(res._json.data).toEqual(tokenInfo);
  });

  it('cleans token before calling API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 200, json: {}, headers: { 'content-type': 'application/json' } })
    ));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: '{ "access_token": "cleaned" }' } }), res);

    expect(fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer cleaned');
  });

  it('returns 500 on network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok' } }), res);

    expect(res._status).toBe(500);
    expect(res._json.details).toBe('Network down');
  });
});

// ============================================================
// get-providers.js
// ============================================================
describe('api/get-providers', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/get-providers.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'DELETE' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 400 when accessToken is missing', async () => {
    const res = mockRes();
    await handler(mockReq({ body: {} }), res);
    expect(res._status).toBe(400);
  });

  it('calls providers endpoint with GET method', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 200, json: { _embedded: [{ id: 'p1' }] }, headers: { 'content-type': 'application/json' } })
    ));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok' } }), res);

    expect(fetch.mock.calls[0][0]).toBe('https://api.loket-ontw.nl/v2/providers/');
    expect(fetch.mock.calls[0][1].method).toBe('GET');
    expect(res._status).toBe(200);
  });
});

// ============================================================
// create-employer.js
// ============================================================
describe('api/create-employer', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/create-employer.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'GET' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 400 without accessToken', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { payload: {}, providerId: 'p1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/token/i);
  });

  it('returns 400 without payload', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', providerId: 'p1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/payload/i);
  });

  it('returns 400 without providerId', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', payload: {} } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/provider/i);
  });

  it('constructs correct URL with providerId', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 201, json: { id: 'e1' }, headers: { 'content-type': 'application/json', 'location': '/employers/e1' } })
    ));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', payload: { name: 'Test' }, providerId: 'prov-abc' } }), res);

    expect(fetch.mock.calls[0][0]).toBe('https://api.loket-ontw.nl/v2/providers/prov-abc/employers');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(res._status).toBe(201);
    expect(res._json.location).toBe('/employers/e1');
  });
});

// ============================================================
// assign-team.js
// ============================================================
describe('api/assign-team', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/assign-team.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'PATCH' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 400 without accessToken', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { employerId: 'e1', teamIds: ['t1'], providerId: 'p1' } }), res);
    expect(res._status).toBe(400);
  });

  it('returns 400 without employerId', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', teamIds: ['t1'], providerId: 'p1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/employer/i);
  });

  it('returns 400 without providerId', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'e1', teamIds: ['t1'] } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/provider/i);
  });

  it('returns 400 without teamIds', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'e1', providerId: 'p1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/team/i);
  });

  it('returns 400 with empty teamIds array', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'e1', providerId: 'p1', teamIds: [] } }), res);
    expect(res._status).toBe(400);
  });

  it('constructs correct URL and sends teamIds', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 200, json: {}, headers: { 'content-type': 'application/json' } })
    ));

    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'emp-1', providerId: 'prov-1', teamIds: ['t1', 't2'] } }), res);

    expect(fetch.mock.calls[0][0]).toBe('https://api.loket-ontw.nl/v2/providers/prov-1/employers/emp-1/authorizationGroups');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(['t1', 't2']);
    expect(res._status).toBe(200);
  });
});

// ============================================================
// assign-modules.js
// ============================================================
describe('api/assign-modules', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/assign-modules.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'PATCH' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 400 without modules', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'e1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/module/i);
  });

  it('constructs correct URL without providerId and sends modules', async () => {
    const modules = [{ id: 'm1', action: 'enable' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({ status: 200, json: {}, headers: { 'content-type': 'application/json' } })
    ));

    const res = mockRes();
    await handler(mockReq({ method: 'POST', body: { accessToken: 'tok', employerId: 'emp-1', modules } }), res);

    expect(fetch.mock.calls[0][0]).toBe('https://api.loket-ontw.nl/v2/providers/employers/emp-1/modules');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(modules);
  });
});

// ============================================================
// create-administration.js
// ============================================================
describe('api/create-administration', () => {
  let handler;

  beforeEach(async () => {
    vi.restoreAllMocks();
    const mod = await import('../api/create-administration.js');
    handler = mod.default;
  });

  it('rejects non-POST methods', async () => {
    const res = mockRes();
    await handler(mockReq({ method: 'PATCH' }), res);
    expect(res._status).toBe(405);
  });

  it('returns 400 without accessToken', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { employerId: 'e1', payload: {} } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/token/i);
  });

  it('returns 400 without employerId', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', payload: {} } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/employer/i);
  });

  it('returns 400 without payload', async () => {
    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', employerId: 'e1' } }), res);
    expect(res._status).toBe(400);
    expect(res._json.error).toMatch(/payload/i);
  });

  it('constructs correct URL with employerId', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      mockFetchResponse({
        status: 201,
        json: { id: 'adm-1' },
        headers: { 'content-type': 'application/json', 'location': '/payrolladministrations/adm-1' },
      })
    ));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', employerId: 'emp-1', payload: { name: 'Adm1' } } }), res);

    expect(fetch.mock.calls[0][0]).toBe('https://api.loket-ontw.nl/v2/providers/employers/emp-1/payrolladministrations');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(res._status).toBe(201);
    expect(res._json.location).toBe('/payrolladministrations/adm-1');
  });

  it('returns 500 on fetch error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')));

    const res = mockRes();
    await handler(mockReq({ body: { accessToken: 'tok', employerId: 'e1', payload: {} } }), res);

    expect(res._status).toBe(500);
    expect(res._json.details).toBe('timeout');
  });
});
