/* ═══════════════════════════════════════════════════════════
   api/save.js  —  Data Sync Engine (Node 24 Crash Protection)
   Commits data.js directly to GitHub via stable payload strings.
═══════════════════════════════════════════════════════════ */
const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Hash');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sentHash = (req.headers['x-admin-hash'] || '').toLowerCase().trim();
  const serverHash = "cfac1101dbf6e35378a8beda38f869cf058ec54804fd505281538c82367b27cf";

  if (!sentHash || sentHash !== serverHash) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Ensure you paste your fresh secure ghp_ token string here
  const token = "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";
  const owner = "MasterBillyButcher"; 
  const repo = "ShowsDB";
  const path = "public/data/data.js";

  let rawContent = "";
  if (req.body) {
    if (typeof req.body === 'string') {
      rawContent = req.body;
    } else if (req.body.data) {
      rawContent = req.body.data;
    } else {
      rawContent = JSON.stringify(req.body, null, 2);
    }
  }

  if (!rawContent) {
    return res.status(400).json({ error: 'Missing data payload text string.' });
  }

  const makeGitHubRequest = (options, postData = null) => {
    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let chunks = '';
        response.on('data', (chunk) => { chunks += chunk; });
        response.on('end', () => {
          let parsed = {};
          try { parsed = JSON.parse(chunks); } catch (e) { parsed = { raw: chunks }; }
          resolve({ status: response.statusCode, data: parsed });
        });
      });
      request.on('error', (err) => reject(err));
      if (postData) request.write(postData);
      request.end();
    });
  };

  try {
    const getOptions = {
      hostname: '://github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Vercel-Serverless-Core-2026',
        'Accept': 'application/vnd.github+json'
      }
    };

    const getRes = await makeGitHubRequest(getOptions);
    const sha = (getRes.status === 200 && getRes.data && getRes.data.sha) ? getRes.data.sha : null;

    const contentBuffer = Buffer.from(rawContent).toString('base64');
    
    // Explicit payload object layout prevents JSON.stringify crashes on Node 24
    const payloadObject = {
      message: "🌐 Global Dashboard Update via Live Admin CMS Engine",
      content: contentBuffer
    };
    if (sha) payloadObject.sha = sha;

    const putData = JSON.stringify(payloadObject);

    const putOptions = {
      hostname: '://github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData),
        'User-Agent': 'Vercel-Serverless-Core-2026',
        'Accept': 'application/vnd.github+json'
      }
    };

    const putRes = await makeGitHubRequest(putOptions, putData);

    if (putRes.status !== 200 && putRes.status !== 201) {
      return res.status(putRes.status).json({ error: `GitHub Write Interrupted: ${JSON.stringify(putRes.data)}` });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: `Server Crash Caught: ${error.message}` });
  }
};
