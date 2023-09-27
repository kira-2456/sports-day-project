import https from 'https';

import app from './app';

const PORT = process.env.PORT || 8000;

const server = https.createServer(app);

const createServer = async () => {
  server.listen(PORT, () => {
    console.log(`Server is listening at PORT: ${PORT}`);
  });
};

createServer();
