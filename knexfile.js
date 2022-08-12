import appconfig from "./src/config/appconfig.js";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    development: {
        client: 'mysql2',
        connection: appconfig.db,
        migrations: {
            directory: __dirname + '/Database/migrations',
        },
        seeds: {
            directory: __dirname + '/Database/seeds',
        },
        pool: {
            min: 0,
            max: 10,
            createTimeoutMillis: 8000,
            acquireTimeoutMillis: 8000,
            idleTimeoutMillis: 8000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100,
        }
    }
}

export default options;