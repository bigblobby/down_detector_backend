import groupService from '../../services/group/index.js';
import {BadRequestException} from '../../utils/errors/index.js';

const groupController = {
    async addMonitorToGroup(req, res){
        const monitorGroup = await groupService.addMonitorToGroup(req.user.id, req.params.id, req.params.monitorId);
        res.status(201).json({message: 'Monitor successfully added to group', monitorGroup});
    },

    async removeMonitorFromGroup(req, res){
        const deleted = await groupService.removeMonitorFromGroup(req.params.id, req.params.monitorId);

        if(deleted){
            res.status(200).json({message: 'Monitor successfully removed from group'});
        } else {
            throw new BadRequestException('We can\'t remove this monitor at this time.');
        }
    },

    async getAllGroups(req, res){
        const groups = await groupService.getGroupsByUserId(req.user.id);
        const message = groups.length > 0 ? 'Groups successfully returned' : 'You have no active groups';
        res.status(200).json({message, groups});
    },

    async getGroupById(req, res){
        const group = await groupService.getGroupById(req.user.id, req.params.id);
        res.status(200).json({group});
    },

    async createGroup(req, res){
        const group = await groupService.createGroup(req.user.id, req.body);
        res.status(201).json({message: 'Successfully created group', group});
    },

    async updateGroup(req, res){
        const group = await groupService.updateGroup(req.user.id, req.params.id, req.body);

        if(group[0]){
            res.status(200).json({message: 'Successfully updated group'});
        } else {
            throw new BadRequestException('We can\'t update this group at this time.')
        }
    },

    async deleteGroup(req, res){
        const deleted = await groupService.deleteGroup(req.user.id, req.params.id);

        if(deleted){
            res.status(200).json({message: 'Successfully deleted group'});
        } else {
            throw new BadRequestException('We can\'t delete this group at this time.');
        }
    }
}


export default groupController;