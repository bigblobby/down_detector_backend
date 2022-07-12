import http from 'http';
import https from "https";
import config from '../config/appconfig';
import app from '../server';
import connectToDB from "../db/index.js";

async function startServer() {
    await connectToDB();

    try {
        http.createServer(app).listen(config.app.port);
        https.createServer({}, app).listen(443);
        console.log(`Server started on port ${config.app.port}`);
    } catch(e) {
        console.error(e);
    }
}

startServer();