const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

/**
 * Adds a protocol to a url.
 *
 * @param url
 * @returns {string}
 * @private
 */
function _addHttp(url){
    return `https://${url}`;
}

/**
 * Checks whether a url has a protocol.
 *
 * @param url
 * @returns {string}
 * @private
 */
function _checkForHttp(url){
    const re = new RegExp("^(http|https)://", "i");
    const match = re.test(url);

    if(!match) return _addHttp(url);
    return url;
}

/**
 * Checks whether a site is up or down.
 *
 * @param {string} url
 * @param {object: {getHeaders: boolean}} options
 * @param {object: {getScreenshot: boolean}} options
 * @returns {Promise<object>}
 */
async function checkUrl(url, options = {}) {
    return new Promise((resolve) => {
        const newUrl = _checkForHttp(url);

        puppeteer
            .launch({
                defaultViewport: {
                    width: 800,
                    height: 600,
                    deviceScaleFactor: 1,
                },
            })
            .then(async (browser) => {
                const date = new Date();
                const page = await browser.newPage();
                const res = await page.goto(newUrl);
                // const performance = JSON.parse(await page.evaluate(
                //     () => JSON.stringify(window.performance)
                // ));
                // const perfEntries = JSON.parse(
                //     await page.evaluate(() => JSON.stringify(performance.getEntries()))
                // );

                let screenshot = null;
                if(options.getScreenshot){
                    screenshot = await page.screenshot({ encoding: "base64" });
                }

                await browser.close();

                resolve({
                    statusText: res.statusText(),
                    statusCode: res.status(),
                    url: res.url(),
                    isDown: !res.ok(),
                    lastChecked: date,
                    headers: options.getHeaders ? res.headers() : null,
                    screenshot: options.getScreenshot ? `data:image/png;base64,${screenshot}` : null
                });
            });
    });
}

/**
 * Returns a screenshot of the site.
 *
 * @param {string} url
 * @returns {Promise<string>}
 */
// function getScreenshot(url){
//     return puppeteer
//         .launch({
//             defaultViewport: {
//                 width: 800,
//                 height: 600,
//                 deviceScaleFactor: 1,
//             },
//         })
//         .then(async (browser) => {
//             const page = await browser.newPage();
//             // await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
//             const res = await page.goto(url);
//             // await page.on('response', async (response) => {
//             //    await console.log(response);
//             //    await console.log(response.status());
//             // });
//             const headers = res.status();
//             console.log(headers);
//             // const screenshot = await page.screenshot({ encoding: "base64" });
//             // await browser.close();
//             return "";
//             // return `data:image/png;base64,${screenshot}`;
//         });
// }

module.exports = {
    checkUrl,
    //getScreenshot
}