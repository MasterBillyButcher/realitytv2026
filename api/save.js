/* ═══════════════════════════════════════════════════════════
   api/save.js  —  Data Sync Engine (Stable HTTPS Core Engine)
   Commits data.js directly to GitHub via hardcoded credentials.
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

  const token = "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";
  const owner = "MasterBillyButcher"; 
  const repo = "ShowsDB";
  let path = "public/data/data.js";

  let rawContent = "";
  if (req.body) {
    if (typeof req.body === 'string') {
      rawContent = req.body;
    } else if (req.body.data) {
      rawContent = req.body.data;
      if (req.body.path) path = req.body.path;
    } else {
      rawContent = JSON.stringify(req.body, null, 2);
    }
  }

  if (!rawContent) {
    return res.status(400).json({ error: 'Missing data payload' });
  }

  // Safe HTTPS network wrapper function
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
    // Step A: Request the current file SHA via standard https
    const getOptions = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'Vercel-Serverless-Core',
        'Accept': 'application/vnd.github+json'
      }
    };

    const getRes = await makeGitHubRequest(getOptions);
    const sha = getRes.status === 200 ? getRes.data.sha : undefined;

    // Step B: Write back changes with a forced file payload build
    const contentBuffer = Buffer.from(rawContent).toString('base64');
    const putData = JSON.stringify({
      message: "🌐 Global Dashboard Update via Live Admin CMS Engine",
      content: contentBuffer,
      sha: sha
    });

    const putOptions = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData),
        'User-Agent': 'Vercel-Serverless-Core',
        'Accept': 'application/vnd.github+json'
      }
    };

    const putRes = await makeGitHubRequest(putOptions, putData);

    if (putRes.status !== 200 && putRes.status !== 201) {
      return res.status(putRes.status).json({ error: `GitHub Engine Block: ${JSON.stringify(putRes.data)}` });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: `Server HTTPS Native Error: ${error.message}` });
  }
};
