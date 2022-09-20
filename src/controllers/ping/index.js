import pingService from '../../services/ping/index.js';

const pingController = {
    async getAllPings(req, res){
        const pings = await pingService.getAllPingsByMonitorId(req.params.monitorId);
        res.status(200).json({message: 'Successfully returned all pings related to this monitor', pings});
    },

    async getPingById(req, res){
        const ping = await pingService.getPingById(req.params.id);
        res.status(200).json({message: 'Successfully returned ping', ping});
    },

    async createPing(req, res){
        const ping = await pingService.createPing(req.body);
        res.status(201).json({message: 'Successfully created ping', ping});
    },

    async check(req, res){
        const data = await pingService.check(req.body);
        res.status(200).json(data);
    }
}

export default pingController;