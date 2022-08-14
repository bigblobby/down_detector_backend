import bcrypt from "bcrypt";
import {SALT} from "../../constants.js";

const passwordService = {
    hashPassword: password => bcrypt.hash(password, SALT),
    verifyPassword: (password, hash) => bcrypt.compare(password, hash),
}

export default passwordService;