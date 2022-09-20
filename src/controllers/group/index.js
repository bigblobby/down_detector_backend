import groupService from '../../services/group/index.js';

const groupController = {
    async addMonitorToGroup(req, res){
        const monitorGroup = await groupService.addMonitorToGroup(req.user.id, req.params.id, req.params.monitorId);
        res.status(201).json({message: 'Monitor successfully added to group', monitorGroup});
    },

    async removeMonitorFromGroup(req, res){
        await groupService.removeMonitorFromGroup(req.params.id, req.params.monitorId);
        res.status(200).json({message: 'Monitor successfully removed from group'});
    },

    async getAllGroups(req, res){
        const groups = await groupService.getGroupsByUserId(req.user.id);
        res.status(200).json({message: 'Groups successfully returned', groups});
    },

    async getGroupById(req, res){
        const group = await groupService.getGroupById(req.user.id, req.params.id);
        res.status(200).json({message: 'Successfully returned group', group});
    },

    async createGroup(req, res){
        const group = await groupService.createGroup(req.user.id, req.body);
        res.status(201).json({message: 'Successfully created group', group});
    },

    async updateGroup(req, res){
        await groupService.updateGroup(req.user.id, req.params.id, req.body);
        res.status(200).json({message: 'Successfully updated group'});
    },

    async deleteGroup(req, res){
        await groupService.deleteGroup(req.user.id, req.params.id);
        res.status(200).json({message: 'Successfully deleted group'});
    }
}


export default groupController;