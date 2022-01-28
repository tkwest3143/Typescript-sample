import { App } from './app';

const port = 3000;
const server = new App();
server.app.listen(port, () =>
  console.log(`[${new Date().toISOString()}] start server[${port}]`)
);