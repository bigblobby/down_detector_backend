import monitorService from '../../services/monitor/index.js';

const monitorController = {
    async getAllMonitors(req, res){
        const monitors = await monitorService.getMonitorsByUserId(req.user.id);
        res.status(200).json({message: 'Monitors successfully returned', monitors});
    },

    async getMonitorById(req, res){
        const monitor = await monitorService.getMonitorById(req.user.id, req.params.id);
        res.status(200).json({message: 'Successfully returned monitor', monitor});
    },

    async createMonitor(req, res){
        const monitor = await monitorService.createMonitor(req.user.id, req.body);
        res.status(201).json({message: 'Successfully created monitor', monitor});
    },

    async updateMonitor(req, res){
        await monitorService.updateMonitor(req.user.id, req.params.id, req.body);
        res.status(200).json({message: 'Successfully updated monitor'});
    },

    async deleteMonitor(req, res){
        await monitorService.deleteMonitor(req.user.id, req.params.id);
        res.status(200).json({message: 'Successfully deleted monitor'});
    }
}


export default monitorController;