const serviceHelper = require('../../helpers/service/index');

async function checkService(req, res){
    const {
        url,
        getScreenshot = false,
        getHeaders = false
    } = req.body;

    const options = {
        getHeaders: getHeaders,
    }

    const result = await serviceHelper.checkUrl(url, options);

    /*
    * @TODO
    * Generate a screenshot, save to a file, then return the path if the screenshot exists.
    * There's no need to generate a screenshot if it already exists.
    */
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