const BACKEND_SERVER = "backend:8080";

const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
    target: 'http://' + BACKEND_SERVER,
    changeOrigin: true
}
module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware(proxy)
    );
};