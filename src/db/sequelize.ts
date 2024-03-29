import {Sequelize} from 'sequelize-typescript';
import appconfig from '../config/appconfig.js';
import {User} from '../models/User.js';
import {UserSettings} from '../models/UserSettings.js';
import {Monitor} from '../models/Monitor.js';
import {Group} from '../models/Group.js';
import {MonitorGroup} from '../models/MonitorGroup.js';
import {Ping} from '../models/Ping.js';
import {EmailVerification} from '../models/EmailVerification.js';
import {ForgotPassword} from '../models/ForgotPassword.js';

export const sequelize = new Sequelize(appconfig.db.name, appconfig.db.user, appconfig.db.password, {
    host: appconfig.db.host,
    dialect: 'mysql',
    database: 'db_name',
    logging: false,
    models: [
        User,
        UserSettings,
        Monitor,
        Group,
        MonitorGroup,
        Ping,
        EmailVerification,
        ForgotPassword
    ]
});