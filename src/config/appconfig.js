import dotenv from "dotenv";
dotenv.config();

export default {
    app: {
        port: process.env.PORT || 8080,
        env: process.env.NODE_ENV || "development"
    },
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }
};