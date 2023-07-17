const { createProxyMiddleware } = require('http-proxy-middleware');

// Get url for backend from env defined in Dockerfile (or alternatively in .env file)
const backend_url = process.env.REACT_APP_BACKEND_URL == null ? "localhost:8080" : process.env.REACT_APP_BACKEND_URL;

const proxy = {
    target: 'http://' + backend_url,
    changeOrigin: true
}
module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware(proxy)
    );
};