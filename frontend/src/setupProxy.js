const backend_server = "backend:8080"; // process.env.BACKEND_SERVER;

const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const proxy = {
    target: 'http://' + backend_server,
    changeOrigin: true
}
module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware(proxy)
    );
};