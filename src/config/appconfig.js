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
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
};