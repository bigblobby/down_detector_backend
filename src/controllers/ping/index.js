import pingService from '../../services/ping/index.js';

const pingController = {
    async check(req, res){
        const data = await pingService.check(req.body);
        res.status(200).json(data);
    }
}

export default pingController;