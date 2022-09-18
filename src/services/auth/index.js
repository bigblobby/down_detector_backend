import jwt from "jsonwebtoken";
import {Op} from "sequelize";
import passwordHelper from "../../helpers/password/index.js"
import {User} from "../../models/User.js";
import {UserSettings} from "../../models/UserSettings.js";

const authService = {
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