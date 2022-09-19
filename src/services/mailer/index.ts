import nodemailer from "nodemailer";
import {ForgotPassword} from '../../models/ForgotPassword.js';
import {EmailVerification} from '../../models/EmailVerification.js';
import {InternalServerErrorException, NotFoundException} from '../../utils/errors/index.js';

const mailerService = {

    createTransport(){
        return nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });
    },

    sendMail(transporter, mailOptions){
        return new Promise<boolean>(async function(resolve, reject) {
            return transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    return reject(false);
                }
                console.log('Message sent: %s', info.messageId);
                resolve(true);
            });
        })
    },

    async sendForgotPasswordEmail(email: string){
        const entity = await ForgotPassword.findOne({where: {email: email}})

        if(entity && entity.token){
            const transporter = this.createTransport();

            const mailOptions = {
                from: `"Company" ${process.env.MAILER_USER}`,
                to: email,
                subject: 'Forgot password',
                text: 'Forgot password',
                html: `Hi! <br><br> You forgot your password!<br><br>
                    <a href=http://127.0.0.1:8080/user/forgot-password/${entity.token} target="_blank">Click here to create a new one</a>`
            };

            const sent = await this.sendMail(transporter, mailOptions);
            if(!sent) throw new InternalServerErrorException('We couldn\'t send an email at this time.');
            return sent;
        } else {
            throw new NotFoundException('Couldn\'t find token');
        }
    },

    async sendEmailVerification(email: string){
        const entity = await EmailVerification.findOne({where: {email: email}});

        if(entity && entity.token){
            const transporter = this.createTransport();

            const mailOptions = {
                from: `"Company" ${process.env.MAILER_USER}`,
                to: email,
                subject: 'Verify Email',
                text: 'Verify Email',
                html: `Hi! <br><br> Thanks for your registration<br><br>
                    <a href=http://127.0.0.1:8080/user/verify/${entity.token} target="_blank">Click here to activate your account</a>`
            };

            const sent = await this.sendMail(transporter, mailOptions);
            if(!sent) throw new InternalServerErrorException('We couldn\'t send an email at this time.');
            return sent;
        } else {
            throw new NotFoundException('Couldn\'t find token');
        }
    }
}

export default mailerService;