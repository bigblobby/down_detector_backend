import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin())

function _addHttp(url){
    return `https://${url}`;
}

function _checkForHttp(url){
    const re = new RegExp('^(http|https)://', 'i');
    const match = re.test(url);

    if(!match) return _addHttp(url);
    return url;
}

const pingHelper = {
    async checkUrl(url, options = {}) {
        return new Promise((resolve) => {
            const newUrl = _checkForHttp(url);

            puppeteer
                .launch({
                    // TODO un-comment this if using docker
                    // executablePath: '/usr/bin/chromium-browser',
                    // args: [
                    //     '--no-sandbox',
                    //     '--disable-setuid-sandbox'
                    // ],
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
                        screenshot = await page.screenshot({ encoding: 'base64' });
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
}

export default pingHelper;