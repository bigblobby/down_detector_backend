import {Group} from "../../models/Group.js";

const groupService = {
    async getGroupsByUserId(userId){
        return await Group.findAll({
            where: {
                userId: userId
            }
        })
    },
    async getGroupById(userId, id){
        const group = await Group.findOne({
            where: {
                userId: userId,
                id: id
            }
        });
        if (!group) {
            throw Error("This group either doesn't exist or you don't have the authorisation to view it.");
        }

        return group;
    },
    async createGroup(userId, data){
        return await Group.create({userId, ...data})
    },
    async updateGroup(userId, id, data){
        const group = await Group.update({
            ...data
        }, {
            where: {userId: userId, id: id}
        })

        if (!group[0]) {
            throw Error("This group either doesn't exist or you don't have the authorisation to update it.");
        }

        return group;
    },
    async deleteGroup(userId, id){
        const group = await Group.destroy({
            where: {
                userId: userId,
                id: id
            }
        });

        if (!group) {
            throw Error("This group either doesn't exist or you don't have the authorisation to delete it.");
        }

        return group;
    },
}

export default groupService;