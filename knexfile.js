import appconfig from "./src/config/appconfig.js";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const options = {
    development: {
        client: 'pg',
        connection: appconfig.db,
        migrations: {
            directory: __dirname + '/Database/migrations',
        },
        seeds: {
            directory: __dirname + '/Database/seeds',
        },
        pool: { min: 5, max: 30 }
    }
}

export default options;