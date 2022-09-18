import jwt from "jsonwebtoken";
import passwordHelper from "../../helpers/password/index.js"
import {User} from "../../models/User.js";
import {UserSettings} from "../../models/UserSettings.js";
import {Op} from "sequelize";

const authService = {
    validateRegisterRequest(data) {
        const {username, password, email} = data;

        if (!username || !password || !email) {
            throw Error("Missing username, email or password")
        }

        return data;
    },

    validateLoginRequest(data) {
        const {email, password} = data;

        if (!email || !password) {
            throw Error("Missing email or password")
        }

        return data;
    },

    async register(data) {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {username: data.username},
                    {email: data.email}
                ]
            }
        })

        if (existingUser) throw Error("Username or email already exists");

        return await User.create({
            ...data,
            settings: {}
        }, {include: [UserSettings]})
    },

    async login(email, password) {
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true,
            nest: true,
            include: [UserSettings]
        });
        if(!user) throw Error("User not found");

        const isValid = await passwordHelper.verifyPassword(password, user.password);
        if(!isValid) throw Error("Invalid password");

        delete user.password;
        return user;
    },

    async signToken(user) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_EXPIRE)})
    }
}


export default authService;