import {UserRepository} from "../../repository/user.repository.js";
import AuthHelper from "../../helpers/auth/index.js";

async function register(req, res) {
    const {username, password, email } = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({message: "Missing username, email or password"});
    }

    try {
        const user = await UserRepository.createUser({username, password, email})
        const token = await AuthHelper.createToken(user);
        res.json({message: "register", user: user, token: token});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

async function login(req, res) {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Missing username or password"});
    }

    try {
        const user = await UserRepository.verifyUser({username, password});
        const token = await AuthHelper.createToken(user);
        res.json({message: "login", user: user, token: token});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

export default {
    register,
    login,
}