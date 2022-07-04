const axios = require('axios');
const puppeteer = require("puppeteer");

function _addHttp(url){
    return `https://${url}`;
}

function _checkForHttp(url){
    const re = new RegExp("^(http|https)://", "i");
    const match = re.test(url);

    if(!match) return _addHttp(url);
    return url;
}

async function checkUrl(url, options = {}) {
    return new Promise((resolve) => {
        const newUrl = _checkForHttp(url);
        axios.get(newUrl)
            .then(response => {
                const date = new Date().toISOString();
                resolve({
                    message: 'Site is up.',
                    code: response.status,
                    url: response.config.url,
                    date: date,
                    headers: options.getHeaders ? response.headers : null
                });
            }).catch(error => {
                const date = new Date().toISOString();
                resolve({
                    message: 'Site is down.',
                    code: 500,
                    url: error.config.url,
                    date: date,
                });
            });
    });
}

function getScreenshot(url){
    return puppeteer
        .launch({
            defaultViewport: {
                width: 800,
                height: 600,
                deviceScaleFactor: 1,
            },
        })
        .then(async (browser) => {
            const page = await browser.newPage();
            await page.goto(url);
            const screenshot = await page.screenshot({ encoding: "base64" });
            await browser.close();
            return `data:image/png;base64,${screenshot}`;
        });
}

module.exports = {
    checkUrl,
    getScreenshot
}