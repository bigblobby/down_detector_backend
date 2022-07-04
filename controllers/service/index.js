const serviceHelper = require('../../helpers/service/index');

async function checkService(req, res){
    // throw new Error('Something broke!');
    const {
        url,
        getScreenshot = false,
        getHeaders = false
    } = req.body;

    const options = {
        getHeaders: getHeaders,
    }

    const result = await serviceHelper.checkUrl(url, options);
    const screenshot = getScreenshot ? await serviceHelper.getScreenshot(result.url) : null;

    const data = {
        ...result,
        screenshot
    }

    res.json(data);

}

module.exports = {
    checkService
}