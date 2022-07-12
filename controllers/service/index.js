import serviceHelper from '../../helpers/service';

async function checkService(req, res){
    const {
        url,
        getScreenshot = false,
        getHeaders = false
    } = req.body;

    const options = {
        getHeaders: getHeaders,
        getScreenshot: getScreenshot
    }

    const result = await serviceHelper.checkUrl(url, options);
    const data = {
        ...result,
    }

    res.json(data);
}

export default {
    checkService
}