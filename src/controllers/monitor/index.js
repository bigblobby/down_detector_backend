import monitorService from "../../services/monitor/index.js";

async function getAllMonitors(req, res){
    try {
        const monitors = await monitorService.getMonitorsByUserId(req.user.id);
        const message = monitors.length > 0 ? "Monitors successfully returned" : "You have no active monitors"

        res.status(200).json({message, monitors})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function getMonitorById(req, res){
    try {
        const monitor = await monitorService.getMonitorById(req.user.id, req.params);

        res.status(200).json({monitor})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function createMonitor(req, res){
    // TODO validate request body

    try {
        const monitor = await monitorService.createMonitor(req.user.id, req.body);

        res.status(201).json({message: 'Successfully created monitor', monitor})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

function updateMonitor(req, res){}

function deleteMonitor(req, res){}

export default {
    getAllMonitors,
    getMonitorById,
    createMonitor,
    updateMonitor,
    deleteMonitor,
}