const serverHost = 'localhost';
const serverPort = process.env.NODE_ENV === 'production' ? 80 : 5000;

const config = {
  api: {
    http: {
      baseURL: `http://${serverHost}:${serverPort}/api`,
    },
    ws: {
      baseURL: `ws://${serverHost}:${serverPort}`,
    },
  },
};

export default config;
