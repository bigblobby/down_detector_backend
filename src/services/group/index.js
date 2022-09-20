import {Group} from '../../models/Group.js';
import {MonitorGroup} from '../../models/MonitorGroup.js';
import {Monitor} from '../../models/Monitor.js';
import {BadRequestException, NotFoundException} from '../../utils/errors/index.js';

const groupService = {
    async addMonitorToGroup(userId, groupId, monitorId){
        const monitor = await Monitor.findOne({where: {id: monitorId, userId: userId}});
        if(!monitor) throw new NotFoundException('Monitor not found');

        const group = await Group.findOne({where: {id: groupId, userId: userId}});
        if(!group) throw new NotFoundException('Group not found');

        const [monitorGroup, created] = await MonitorGroup.findOrCreate({
            where: {
                groupId: groupId,
                monitorId: monitorId
            }
        });

        if(!created) throw new BadRequestException('This monitor has already been added to this group.');

        return monitorGroup;
    },

    async removeMonitorFromGroup(groupId, monitorId){
        const monitorGroup = await MonitorGroup.destroy({
            where: {
                groupId: groupId,
                monitorId: monitorId
            }
        });

        if (!monitorGroup) {
            throw new BadRequestException('We can\'t remove this monitor at this time.');
        }
    },

    async getGroupsByUserId(userId){
        return await Group.findAll({
            where: {
                userId: userId
            }
        });
    },

    async getGroupById(userId, id){
        const group = await Group.findOne({
            where: {
                userId: userId,
                id: id
            },
            include: [{
                model: Monitor,
            }]
        });

        if (!group) {
            throw new BadRequestException('This group either doesn\'t exist or you don\'t have the authorisation to view it.');
        }

        return group;
    },

    async createGroup(userId, data){
        return await Group.create({userId, ...data});
    },

    async updateGroup(userId, id, data){
        const group = await Group.update({
            ...data
        }, {
            where: {userId: userId, id: id}
        });

        if (!group[0]) {
            throw new BadRequestException('This group either doesn\'t exist or you don\'t have the authorisation to update it.');
        }
    },

    async deleteGroup(userId, id){
        const group = await Group.destroy({
            where: {
                userId: userId,
                id: id
            }
        });

        if (!group) {
            throw new BadRequestException('This group either doesn\'t exist or you don\'t have the authorisation to delete it.');
        }

        await MonitorGroup.destroy({
            where: {
                groupId: id,
            }
        });
    },
}

export default groupService;