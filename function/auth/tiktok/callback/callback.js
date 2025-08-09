export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const esc = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TikTok OAuth Callback – Kamurashop</title>
  <meta name="robots" content="noindex,nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;max-width:700px;margin:48px auto;padding:0 16px;line-height:1.6}
    code{background:#111214;color:#e6e6e6;padding:2px 6px;border-radius:4px}
  </style>
</head>
<body>
  <h1>Callback received</h1>
  <p>Status: <strong>OK</strong></p>
  <p><strong>code</strong>: <code>${esc(code) || '—'}</code></p>
  <p><strong>state</strong>: <code>${esc(state) || '—'}</code></p>
  <p>You can return to the app. This page is for verification/logging only.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
    status: 200,
  });
}
