import monitorService from '../../services/monitor/index.js';
import {InternalServerErrorException} from '../../utils/errors/index.js';

const monitorController = {
    async getAllMonitors(req, res){
        const monitors = await monitorService.getMonitorsByUserId(req.user.id);
        const message = monitors.length > 0 ? 'Monitors successfully returned' : 'You have no active monitors';
        res.status(200).json({message, monitors});
    },

    async getMonitorById(req, res){
        const monitor = await monitorService.getMonitorById(req.user.id, req.params.id);
        res.status(200).json({monitor});
    },

    async createMonitor(req, res){
        const monitor = await monitorService.createMonitor(req.user.id, req.body);
        res.status(201).json({message: 'Successfully created monitor', monitor});
    },

    async updateMonitor(req, res){
        const monitor = await monitorService.updateMonitor(req.user.id, req.params.id, req.body);

        if(monitor[0]){
            res.status(200).json({message: 'Successfully updated monitor'});
        } else {
            throw new InternalServerErrorException('We can\'t update this monitor at this time.');
        }
    },

    async deleteMonitor(req, res){
        const deleted = await monitorService.deleteMonitor(req.user.id, req.params.id);

        if(deleted){
            res.status(201).json({message: 'Successfully deleted monitor'});
        } else {
            throw new InternalServerErrorException('We can\'t delete this monitor at this time.');
        }
    }
}


export default monitorController;