import config from '../config/appconfig';
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    port: parseInt(config.db.port || "5432")
});

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err);
    }
};

export default connectToDB;