import MonitorModel from "../../models/MonitorModel.js";

const monitorService = {
    monitorRepository: new MonitorModel(),

    async getMonitorsByUserId(id){
        return await this.monitorRepository.find({user_id: id});
    },

    async getMonitorById(userId, data){
        const monitor = await this.monitorRepository.find({user_id: userId, ...data});

        if(monitor.length === 0){
            throw Error("This monitor either doesn't exist or you don't have the authorisation to view it.");
        }

        return monitor[0];
    },

    async createMonitor(userId, data){
        const monitor = await this.monitorRepository.create({user_id: userId, ...data});
        return await this.monitorRepository.findOne({'id': monitor[0]});
    }
}

export default monitorService;