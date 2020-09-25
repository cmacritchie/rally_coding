const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob
require('dotenv').config()

const bookGymSession = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://www.goodlifefitness.com/members/login')

    const userName =process.env.USER_NAME; 
    const password =process.env.PASSWORD 

    try {
        //Logs in
        await page.type("input[name='Email/Member #']", userName)
        await page.type("input[name='Password']", password)
        await page.click('#btn-login')
    
        //awaits club page and navigates to possible workouts
        await page.waitFor('.club-address')
        await page.goto("https://www.goodlifefitness.com/members/bookings/workout")
    
        //selects the open dates and selects the last date in the row (1 week from now)
        await page.waitFor('#date-container')
        await page.click('#date-container > .date-tile-container > div:last-child') //good version
        // await page.click('#date-container > .date-tile-container > div:nth-last-child(2)') //practice sunday
      
        //wait for selector of time slot
        await page.waitForSelector('.time-slot-morning');
        await page.waitForSelector('button[data-display="6:00AM - 7:00AM"]'); //good version 
        await page.click('button[data-display="6:00AM - 7:00AM"]') //good version
        
        const textContent = await page.evaluate(() => {
            return document.querySelector('button[data-display="6:00AM - 7:00AM"].cancel-workout-button');
         });
         if(textContent) {
             console.log("it exists")
             return await browser.close();
             
         }
        // await page.waitForSelector('button[data-display="7:00AM - 8:00AM"]'); //practice sunday
        // await page.click('button[data-display="7:00AM - 8:00AM"]') //practice Sunday
    
        //agree to terms and conditions
        await page.waitForSelector('#codeOfConductAgree');
    
        await page.$eval('#confirmBookingButton', e => e.removeAttribute ("disabled"))
        await page.waitFor(() => !document.querySelector('#confirmBookingButton[disabled="disabled"]'));
        await page.waitFor(4000)
     
        await page.click('#confirmBookingButton');
        await page.waitFor(4000)
    } catch (e) {
        console.log(e)
    }

    await browser.close();
    
}

const job = new CronJob('00 13,14,17 08 * * 1-5', function() {
	bookGymSession()
}, null, true, "America/Edmonton");
job.start()

