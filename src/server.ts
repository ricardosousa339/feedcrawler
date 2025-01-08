import http from 'http';
import https from 'https';

function fetchLatestPost(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get('https://api.bluesky.com/latest-post', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve(data);
      });

    }).on('error', (err) => {
      reject(err);
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/latest-post') {
    try {
      const post = await fetchLatestPost();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(post);
    } catch (error) {
      res.statusCode = 500;
      res.end('Error fetching latest post');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});