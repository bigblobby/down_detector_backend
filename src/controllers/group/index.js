import groupService from "../../services/group/index.js";

const groupController = {
    async getAllGroups(req, res){
        try {
            const groups = await groupService.getGroupsByUserId(req.user.id);
            const message = groups.length > 0 ? "Groups successfully returned" : "You have no active groups"

            res.status(200).json({message, groups})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async getGroupById(req, res){
        try {
            const group = await groupService.getGroupById(req.user.id, req.params.id);

            res.status(200).json({group})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async createGroup(req, res){
        try {
            const group = await groupService.createGroup(req.user.id, req.body);

            res.status(201).json({message: 'Successfully created group', group})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async updateGroup(req, res){
        try {
            const group = await groupService.updateGroup(req.user.id, req.params.id, req.body);

            if(group[0]){
                res.status(200).json({message: 'Successfully updated group'})
            } else {
                res.status(500).json({message: 'We can\'t update this group at this time.'})
            }
        } catch (err){
            res.status(400).json({message: err.message, errors: err.errors});
        }
    },

    async deleteGroup(req, res){
        try {
            const deleted = await groupService.deleteGroup(req.user.id, req.params.id);

            if(deleted){
                res.status(201).json({message: 'Successfully deleted group'})
            } else {
                res.status(500).json({message: 'We can\'t delete this group at this time.'})
            }
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}


export default groupController;