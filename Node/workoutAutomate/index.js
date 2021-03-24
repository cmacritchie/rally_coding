const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob
require('dotenv').config()

// const bookGymSession = async () => {
//     const browser = await puppeteer.launch({headless: false})
//     const page = await browser.newPage()
//     await page.goto('https://www.goodlifefitness.com/members/login')

//     const userName =process.env.USER_NAME; 
//     const password =process.env.PASSWORD 

//     try {
//         //Logs in
//         await page.type("input[name='Email/Member #']", userName)
//         await page.type("input[name='Password']", password)
//         await page.click('#btn-login')
    
//         //awaits club page and navigates to possible workouts
//         await page.waitFor('.club-address')
//         await page.goto("https://www.goodlifefitness.com/members/bookings/workout")
    
//         //selects the open dates and selects the last date in the row (1 week from now)
//         await page.waitFor('#date-container')
//         await page.click('#date-container > .date-tile-container > div:last-child') //good version
//         // await page.click('#date-container > .date-tile-container > div:nth-last-child(2)') //practice sunday
      
//         //wait for selector of time slot
//         await page.waitForSelector('.time-slot-morning');
//         await page.waitForSelector('button[data-display="6:00AM - 7:00AM"]'); //good version 
//         await page.click('button[data-display="6:00AM - 7:00AM"]') //good version
        
//         const textContent = await page.evaluate(() => {
//             return document.querySelector('button[data-display="6:00AM - 7:00AM"].cancel-workout-button');
//          });
//          if(textContent) {
//              console.log("it exists")
//              return await browser.close();
             
//          }
//         // await page.waitForSelector('button[data-display="7:00AM - 8:00AM"]'); //practice sunday
//         // await page.click('button[data-display="7:00AM - 8:00AM"]') //practice Sunday
    
//         //agree to terms and conditions
//         await page.waitForSelector('#codeOfConductAgree');
    
//         await page.$eval('#confirmBookingButton', e => e.removeAttribute ("disabled"))
//         await page.waitFor(() => !document.querySelector('#confirmBookingButton[disabled="disabled"]'));
//         await page.waitFor(4000)
     
//         await page.click('#confirmBookingButton');
//         await page.waitFor(4000)
//     } catch (e) {
//         console.log(e)
//     }

//     await browser.close();
    
// }

const bookGymSession = async () => {
    const browser = await puppeteer.launch({headless: true, }) //defaultViewport: null })
    // const context = browser.defaultBrowserContext()
    // const context = await browser.createIncognitoBrowserContext();
    // await context.overridePermissions('https://www.goodlifefitness.com/', ['geolocation'])
    // context.overridePermissions('https://www.goodlifefitness.com/', ["geolocation", "notifications"]);
    const page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    // await page.setGeolocation({latitude: parseFloat(51.044), longitude: parseFloat(114.072)})
    page.on("popup", () => {
      console.log("this is fucked")
    })
    page.on('dialog', async dialog => {
      console.log("BAD MESSAGE", dialog.message());
      await dialog.dismiss();
    });
    await page.goto('https://www.goodlifefitness.com/')

    const userName =process.env.USER_NAME; 
    const password =process.env.PASSWORD 

    try {
        //Logs in
        await page.waitFor('a.c-header__login-text')
        await page.click('a.c-header__login-text')
        await page.waitFor('div.u-transition-visible')
        await page.waitFor('h3.c-login-block__title')
        await page.waitForSelector("input[type='email']")
        await page.waitFor(2000); //change to 5
        await page.type("input[type='email']", userName)
        await page.type("input[type='password']", password)
        await page.click("button.js-login-submit")
    
        // //awaits club page and navigates to possible workouts
        await page.waitFor(2000); //change to 5
        await page.goto("https://www.goodlifefitness.com/book-workout.html#no-redirect")
        // await page.evaluateOnNewDocument(function() {
        //     navigator.geolocation.getCurrentPosition = function (cb) {
        //       setTimeout(() => {
        //         cb({
        //           'coords': {
        //             accuracy: 21,
        //             altitude: null,
        //             altitudeAccuracy: null,
        //             heading: null,
        //             latitude: 23.129163,
        //             longitude: 113.264435,
        //             speed: null
        //           }
        //         })
        //       }, 1000)
        //     }
        //   });
        // page.on('dialog', async dialog => {
        //   console.log("DIALOGGGGG")
        //     console.log(dialog.message());
        //     await dialog.dismiss();
        //     });
    
        console.log('partially in')
        await page.waitForSelector('#js-class-schedule-weekdays-container')
        await page.waitFor(3000);
        await page.click('li.js-class-weekday[data-day="day-number-7"]')
        // await context.close();
        console.log('out')
        let element = await page.$('div#day-number-7 > li:nth-child(2)') //> div:nth-child(2) > div > div:nth-child(1) > button')
        let workoutid = await page.evaluate(el => el.getAttribute("data-workout-id"), element)
        // let element = await page.$('div#day-number-7 > li:nth-child(2)', element => element.innerHTML)
        console.log("data workout id", workoutid)
        await page.waitFor(3000);
        await page.click('button[data-workout-id="' + workoutid + '"]');
        await page.waitFor(3000);
        // await page.$eval('button.js-terms-agreement-cta[data-workout-id="' + workoutid + '"]', e => e.setAttribute("aria-disabled","false"))
        await page.click('input#js-workout-booking-agreement-input[name="booking-agreement"]');
        // await page.waitFor('button.modal-class-action');
        // await page.click('button.modal-class-action');
        await page.click('button.modal-class-action[data-workout-id="' + workoutid + '"]');
        //
        console.log('booked?')

        //LOOKS LIKE IT WORKS NOW, DEPLOY and ENJOY
        
        
        // //selects the open dates and selects the last date in the row (1 week from now)
        // await page.waitFor('#date-container')
        // await page.click('#date-container > .date-tile-container > div:last-child') //good version
        // // await page.click('#date-container > .date-tile-container > div:nth-last-child(2)') //practice sunday
      
        // //wait for selector of time slot
        // await page.waitForSelector('.time-slot-morning');
        // await page.waitForSelector('button[data-display="6:00AM - 7:00AM"]'); //good version 
        // await page.click('button[data-display="6:00AM - 7:00AM"]') //good version
        
        // const textContent = await page.evaluate(() => {
        //     return document.querySelector('button[data-display="6:00AM - 7:00AM"].cancel-workout-button');
        //  });
        //  if(textContent) {
        //      console.log("it exists")
        //      return await browser.close();
             
        //  }
        // // await page.waitForSelector('button[data-display="7:00AM - 8:00AM"]'); //practice sunday
        // // await page.click('button[data-display="7:00AM - 8:00AM"]') //practice Sunday
    
        // //agree to terms and conditions
        // await page.waitForSelector('#codeOfConductAgree');
    
        // await page.$eval('#confirmBookingButton', e => e.removeAttribute ("disabled"))
        // await page.waitFor(() => !document.querySelector('#confirmBookingButton[disabled="disabled"]'));
        // await page.waitFor(4000)
     
        // await page.click('#confirmBookingButton');
        // await page.waitFor(4000)
    } catch (e) {
        console.log(e)
    }

    // await browser.close();
    
}

bookGymSession()

// const job = new CronJob('00 13,14,17 08 * * 1-5', function() {
// 	bookGymSession()
// }, null, true, "America/Edmonton");
// job.start()

