import {Monitor} from '../../models/Monitor.js';
import {Group} from '../../models/Group.js';
import {MonitorGroup} from '../../models/MonitorGroup.js';
import {Ping} from '../../models/Ping.js';
import {BadRequestException} from '../../utils/errors/index.js';

const monitorService = {
    async getMonitorsByUserId(userId) {
        return await Monitor.findAll({
            where: {
                userId: userId
            }
        })
    },

    async getMonitorById(userId, id) {
        const monitor = await Monitor.findOne({
            where: {
                userId: userId,
                id: id
            },
            include: [{
                model: Group
            }, {
                model: Ping
            }]
        });

        if (!monitor) {
            throw new BadRequestException('This monitor either doesn\'t exist or you don\'t have the authorisation to view it.');
        }

        return monitor;
    },

    async createMonitor(userId, data) {
        return await Monitor.create({userId, ...data})
    },

    async updateMonitor(userId, id, data) {
        const monitor = await Monitor.update({
            ...data
        }, {
            where: {userId: userId, id: id}
        })

        if (!monitor[0]) {
            throw new BadRequestException('This monitor either doesn\'t exist or you don\'t have the authorisation to update it.');
        }
    },

    async deleteMonitor(userId, id) {
        const monitor = await Monitor.destroy({
            where: {
                userId: userId,
                id: id
            }
        });

        if (!monitor) {
            throw new BadRequestException('This monitor either doesn\'t exist or you don\'t have the authorisation to delete it.');
        }

        await MonitorGroup.destroy({
            where: {
                monitorId: id,
            }
        });
    }
}

export default monitorService;