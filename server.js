const https = require('https');
const fs = require('fs');
const next = require('next');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const sslPath = process.env.SSL_PATH;

const httpsOptions = {
  key: fs.readFileSync(path.join(sslPath, process.env.SSL_KEY)),
  cert: fs.readFileSync(path.join(sslPath, process.env.SSL_PEM)),
  ca: fs.readFileSync(path.join(sslPath, process.env.SSL_CORECA))
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`HTTPS server running at https://localhost:${port}`);
  });
});
