import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {Op} from 'sequelize';
import {BadRequestException, InternalServerErrorException, NotFoundException} from '../../utils/errors/index.js'
import passwordHelper from '../../helpers/password/index.js';
import {User} from '../../models/User.js';
import {UserSettings} from '../../models/UserSettings.js';
import {EmailVerification} from '../../models/EmailVerification.js';
import {ForgotPassword} from '../../models/ForgotPassword.js';
import permissionMapper from '../../validators/permissionMapper.js';

const authService = {
    async register(data) {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {username: data.username},
                    {email: data.email}
                ]
            }
        });

        if (existingUser) throw new BadRequestException('Username or email already exists');

        return await User.create({
            ...data,
            allowedActions: Object.values(permissionMapper),
            settings: {}
        }, {include: [UserSettings]});
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

        if(!user) throw new NotFoundException("User not found");
        const isValid = await passwordHelper.verifyPassword(password, user.password);
        if(!isValid) throw new BadRequestException("Invalid password");

        delete user.password;
        return user;
    },

    async logout(req, res){
        if(req.signedCookies.access_token){
            res.clearCookie('access_token');
        } else {
            throw new BadRequestException('Invalid access token');
        }
    },

    async signToken(user) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: Number(process.env.JWT_EXPIRE)});
    },

    async createEmailToken(email: string): Promise<EmailVerification> {
        const token = uuidv4();
        const expiresAt = new Date().setHours((new Date()).getHours() + 2);

        const [result, inserted] = await EmailVerification.upsert({
            email: email,
            token: token,
            expiresAt: expiresAt
        });

        if(!result) throw new InternalServerErrorException('Something went wrong');

        return result;
    },

    async verifyEmail(token: string) {
        const emailVerification: EmailVerification|null = await EmailVerification.findOne({where: {token: token}});

        if(emailVerification && emailVerification.token){
            const expires = new Date(emailVerification.expiresAt).getTime();
            const now = new Date().getTime();

            if(expires < now) {
                throw new BadRequestException('This token has expired please request a new one')
            }

            const user = await User.update({isVerified: true}, {where: {email: emailVerification.email}});

            if(!user[0]){
                throw new InternalServerErrorException('We couldn\'t verify this account')
            }

        } else {
            throw new NotFoundException('We couldn\'t find a token associated to this user, please request a new code')
        }
    },

    async forgotPassword(email: string){
        return await this.createForgotPasswordToken(email);
    },

    async changePassword(token: string, password: string){
        const forgottenPassword = await ForgotPassword.findOne({where: {token: token}});

        if(forgottenPassword && forgottenPassword.token){
            const expires = new Date(forgottenPassword.expiresAt).getTime();
            const now = new Date().getTime();

            if(expires < now) {
                throw new BadRequestException('This token has expired please request a new one')
            }

            const user = await User.findOne({where: {email: forgottenPassword.email}});

            if(user){
                await ForgotPassword.destroy({where: {token: token}});
                return await User.update({password: password}, {where: {id: user.id}, individualHooks: true});
            } else {
                throw new NotFoundException('User not found');
            }
        } else {
            throw new BadRequestException('You need a valid password token to change your password.');
        }
    },

    async createForgotPasswordToken(email: string){
        const token = uuidv4();
        const expiresAt = new Date().setMinutes((new Date()).getMinutes() + 15);

        const [result, inserted] = await ForgotPassword.upsert({
            email: email,
            token: token,
            expiresAt: expiresAt
        });

        if(!result) throw new InternalServerErrorException('Something went wrong');

        return result;
    },
}


export default authService;