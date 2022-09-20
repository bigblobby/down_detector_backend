import pingHelper from '../../helpers/ping/index.js';
import {Ping} from '../../models/Ping.js';
import {NotFoundException} from '../../utils/errors/index.js';
import {Monitor} from '../../models/Monitor.js';

const pingService = {
    async getAllPingsByMonitorId(monitorId){
        const pings = await Ping.findAll({where: {monitorId: monitorId}});
        if(pings.length === 0) throw new NotFoundException('There are no pings related to this monitor');
        return pings;
    },

    async getPingById(id){
        const ping = ping.findOne({where: {id: id}});
        if (!ping) throw new NotFoundException('Ping not found.');
        return ping;
    },

    async createPing(data){
        const monitor = await Monitor.findOne({where: {id: data.monitorId}});
        if(!monitor) throw new NotFoundException('That monitor doesn\'t exist.');
        return await Ping.create(data);
    },

    async check(body){
        const {
            url,
            getScreenshot = false,
            getHeaders = false
        } = body;

        const options = {
            getHeaders: getHeaders,
            getScreenshot: getScreenshot
        }

        const result = await pingHelper.checkUrl(url, options);

        return {
            ...result,
        }
    }
}

export default pingService;