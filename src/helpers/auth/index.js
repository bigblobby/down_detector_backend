import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT = 10;
const hashPassword = password => bcrypt.hash(password, SALT);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

function createToken(user){
    return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_EXPIRE)})
}

function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        })
    });
}

export default {
    createToken,
    verifyToken,
    hashPassword,
    verifyPassword
}