const puppeteer = require("puppeteer")
const fs = require("fs")

interface ProductLink {
    link: string;
    model: string;
    status: boolean;
}

interface ProductInfo {
    link: string;
    info: string;
    price: number;
    sps: number;
    model: string;
    discount: number;
    finalPrice: number;
}
const data: ProductLink[] = require('../front/src/data.json');
const allParsedData: ProductInfo[] = [];
const parse = async (link: string, model: string) => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
    await page.setDefaultNavigationTimeout(0);
    await page.goto(link);
    const info: ProductInfo[] = [];

    do {
        const nextPage = await page.evaluate(() => {
            return document.querySelector('li.next') !== null;
        });

        const productInfo: ProductInfo[] = await page.$$eval('div.item-info', (itemInfo, model) => {
            itemInfo = itemInfo.map(el => {
                const hasCashback = el.querySelector('div.item-bonus');
                if (hasCashback) {
                    const link = el.querySelector('a.ddl_product_link:not([class*="additional_class"])')?.href;
                    const info = el.querySelector('a.ddl_product_link')?.innerText;
                    const price = (el.querySelector('div.item-price span')?.innerText || '').replace(/[^\d-]/g, '');
                    const sps = (el.querySelector('div.money-bonus_loyalty span.bonus-amount')?.innerHTML || '').replace(/[^\d-]/g, '');
                    const discount = Math.ceil((sps / price) * 100)
                    const finalPrice = price - sps
                    if (link && info && price && sps && discount && finalPrice) {
                        return { link, info, price, sps, model, discount, finalPrice };
                    }
                }
                return null;
            }).filter(el => el !== null && Object.keys(el).length !== 0);
            return itemInfo;
        }, model);

        allParsedData.push(...productInfo);

        info.push(...productInfo);
        // console.log(info);
        console.log(info.length);

        await page.waitForTimeout(1000);

        if (nextPage) {
            try {
                await page.click('li.next');
            } catch { break }
        } else {
            break;
        }

    } while (true);
    browser.close();
}
const linkss = data

const startParse = async () => {
    for (let i = 0; i < linkss.length; i++) {
        if (linkss[i].status === true)
            await parse(linkss[i].link, linkss[i].model)
        console.log(linkss[i].model + ' was parsed')
    }
    fs.writeFile('../front/src/result.json', JSON.stringify(allParsedData), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`The data has been scraped and saved successfully! View it at 0.json`);
    });

    console.log('Всего товаров:' + allParsedData.length)
};
startParse();
