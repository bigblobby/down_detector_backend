const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
const serviceRouter = require('./routes/service/index');

app.use('/api/v1/service', serviceRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
})

async function startServer() {
    try {
        http.createServer(app).listen(PORT);
        https.createServer({}, app).listen(443);
    } catch(e) {
        console.error(e);
    }
}

startServer();