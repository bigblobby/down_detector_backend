import jwt from 'jsonwebtoken';
import redisClient from '../../utils/connectRedis.js';
import {BadRequestException, InternalServerErrorException, UnauthorizedException} from '../../utils/errors/index.js';

const jwtService = {
    async signAccessToken(user) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_ACCESS_EXPIRE)});
    },

    async signRefreshToken(user) {
        return jwt.sign({id: user.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: Number(process.env.JWT_REFRESH_EXPIRE)});
    },

    async verifyAccessToken(token){
        return jwt.verify(token, process.env.JWT_SECRET);
    },

    async verifyRefreshToken(token){
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    },

    async addRefreshTokenToRedis(id, token){
        const key = `${id}_${token}`;
        const check = await redisClient.EXISTS(key);
        if (check == 1) throw new InternalServerErrorException('Cache error');

        await redisClient.SET(key, "valid");
        /*
            TODO this feels wrong, we shouldn't need to verify the token
             immediately after signing it. Need to figure out a proper way
              of setting the expiry date for redis.
         */
        const payload = await this.verifyRefreshToken(token);
        // @ts-ignore
        if ('exp' in payload) {
            await redisClient.EXPIREAT(key, Number(payload.exp));
        }
        return;
    },

    async checkRefreshTokenExists(id, token){
        const key = `${id}_${token}`;
        const data = await redisClient.GET(key)

        if(data === 'valid'){
            return true;
        } else if(data === "nil"){
            throw new InternalServerErrorException('Refresh token cache error');
        } else if(data === "invalid"){
            throw new UnauthorizedException('You need to re-login')
        } else {
            throw new BadRequestException('Invalid refresh token');
        }
    },

    async invalidateToken(targetUserId){
        for await (const key of redisClient.scanIterator({
            MATCH: `${targetUserId}*`,
        })) {
            await redisClient.set(key, "invalid");
        }
        return;
    }
}

export default jwtService;