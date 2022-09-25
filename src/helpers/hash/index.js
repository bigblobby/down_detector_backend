import bcrypt from 'bcrypt';
import {SALT} from '../../constants.js';

const hashHelper = {
    hash: (password, salt = SALT) => bcrypt.hash(password, salt),
    verify: (password, hash) => bcrypt.compare(password, hash),
}

export default hashHelper;