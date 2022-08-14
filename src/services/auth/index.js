import UserModel from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import passwordService from "../password/index.js";

const AuthService = {
    userRepository: new UserModel(),
    passwordService: passwordService,

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
        // Check if user already exists
        const existingUser = await this.userRepository.findExistingUser(data.username, data.email);
        if (existingUser.length) throw Error("Username or email already exists");

        // Hash password
        const passwordHash = await this.passwordService.hashPassword(data.password);

        // Create user and return
        return await this.userRepository.create({...data, password: passwordHash});
    },

    async login(email, password) {
        const user = await this.userRepository.findOne({email: email})
        if(!user) throw Error("User not found");

        const isValid = await this.passwordService.verifyPassword(password, user.password);
        if(!isValid) throw Error("Invalid password");

        return user;
    },

    async signToken(user) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_EXPIRE)})
    }
}


export default AuthService;