import { createClient } from 'redis';

const redisUrl = `redis://localhost:6379`;
const redisClient = createClient({
    url: redisUrl,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err: any) {
        console.log(err.message);
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

redisClient.on('connect', (err) => console.log('Redis client connected...'));
redisClient.on("ready", (err) => console.log("Redis ready to use"));
redisClient.on('error', (err) => console.log(err));
redisClient.on("end", () => console.log("Redis disconnected successfully"));

export default redisClient;