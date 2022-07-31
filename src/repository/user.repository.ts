import {AppDataSource} from "../db/index.js";
import {User} from "../entities/User.js";
import {UserSettings} from "../entities/UserSettings.js";
import bcrypt from "bcrypt";

export const UserRepository = AppDataSource.getRepository(User).extend({
    async createUser(data) {
        try {
            const user = new User();
            const settings = new UserSettings();
            user.username = data.username;
            user.email = data.email;
            user.password = data.password;
            user.settings = settings;
            return await this.save(user);
        } catch (error) {
            throw error;
        }
    },

    async verifyUser(data) {
        const user = await this.findOne({
            where: {
                username: data.username,
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            throw new Error("Invalid username or password");
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    }
});