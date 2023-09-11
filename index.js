const puppeteer = require("puppeteer")
const cron = require("node-cron")
require('dotenv').config()

function estWeekend(date) {
    return date.getDay() === 0 || date.getDay() === 6;
}


async function launchSignature() {

    const browser = await puppeteer.launch({headless : "new"})
    const page = await browser.newPage()

    await page.goto("https://odyssey.wildcodeschool.com")

    await page.setViewport({width: 1080, height: 1024});

    await page.waitForSelector('input[placeholder="your@email.com"]', {visible: true})
    await page.waitForSelector('input[type="password"]', {visible: true})
    await page.waitForSelector('button.mui-1cpqu5t-button[type="button"]', {visible: true})

    await page.type('input[placeholder="your@email.com"]', `${process.env.USER_EMAIL}`)

    await page.type('input[type="password"]', `${process.env.PASSWORD}`)

    await page.click('button.mui-1cpqu5t-button[type="button"]')

    await page.waitForSelector(`a.MuiButtonBase-root.MuiCardActionArea-root.mui-11btcp1-clickableArea[href="/crews/${process.env.CREW_ID}"]`, {visible: true})

    await page.click(`a.MuiButtonBase-root.MuiCardActionArea-root.mui-11btcp1-clickableArea[href="/crews/${process.env.CREW_ID}"]`)

    await page.waitForSelector('button span:nth-of-type(2) svg', {visible : true})

    await page.click('button span:nth-of-type(2) svg')

}

cron.schedule('10 9 * * 1-5', async () => {
    console.log("started morning sign")
    const maintenant = new Date();
    if (!estWeekend(maintenant)) {
        launchSignature()
    }
})

cron.schedule('10 14 * * 1-5', async () => {
    console.log("started afternoon sign")
    const maintenant = new Date();
    if (!estWeekend(maintenant)) {
        launchSignature()
    }
})
