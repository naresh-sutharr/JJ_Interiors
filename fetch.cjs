const https = require('https');
https.get('https://www.jjinteriors.site/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.match(/<meta name="google-site-verification"[^>]+>/g));
  });
});
