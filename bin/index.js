const app = require('../server');
const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        http.createServer(app).listen(PORT);
        https.createServer({}, app).listen(443);
    } catch(e) {
        console.error(e);
    }
}

startServer();