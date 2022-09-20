import pingHelper from '../../helpers/ping/index.js';

const pingService = {
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