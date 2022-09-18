import monitorService from "../../services/monitor/index.js";

const monitorController = {
    async getAllMonitors(req, res){
        try {
            const monitors = await monitorService.getMonitorsByUserId(req.user.id);
            const message = monitors.length > 0 ? "Monitors successfully returned" : "You have no active monitors"

            res.status(200).json({message, monitors})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async getMonitorById(req, res){
        try {
            const monitor = await monitorService.getMonitorById(req.user.id, req.params.id);

            res.status(200).json({monitor})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async createMonitor(req, res){
        try {
            const monitor = await monitorService.createMonitor(req.user.id, req.body);

            res.status(201).json({message: 'Successfully created monitor', monitor})
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    },

    async updateMonitor(req, res){
        try {
            const monitor = await monitorService.updateMonitor(req.user.id, req.params.id, req.body);

            if(monitor[0]){
                res.status(200).json({message: 'Successfully updated monitor'})
            } else {
                res.status(500).json({message: 'We can\'t update this monitor at this time.'})
            }
        } catch (err){
            res.status(400).json({message: err.message, errors: err.errors});
        }
    },

    async deleteMonitor(req, res){
        try {
            const deleted = await monitorService.deleteMonitor(req.user.id, req.params.id);

            if(deleted){
                res.status(201).json({message: 'Successfully deleted monitor'})
            } else {
                res.status(500).json({message: 'We can\'t delete this monitor at this time.'})
            }
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}


export default monitorController;