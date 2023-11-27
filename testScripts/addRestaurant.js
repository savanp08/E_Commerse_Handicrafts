import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';

async function addRestaurant(driver){
    try{
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const bookNameEel = await driver.wait(until.elementLocated(By.className('carc12-addres-Button')), 10000);
        await bookNameEel.click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        const street1 = await driver.wait(until.elementLocated(By.id('report-item-location-street1')), 10000);
        await timeoutFunction(2);
        await street1.sendKeys("490");
       const street2 = await driver.wait(until.elementLocated(By.id('report-item-location-street2')), 10000);
        await timeoutFunction(2);
        await street2.sendKeys(" 9th Ave");
        const county = await driver.wait(until.elementLocated(By.id('report-item-location-county')), 10000);
        await timeoutFunction(2);
        await county.sendKeys("Santa Clara");
        const city = await driver.wait(until.elementLocated(By.id('report-item-location-city')), 10000);
        await timeoutFunction(2);
        await city.sendKeys("Sunnyvale");
        const state = await driver.wait(until.elementLocated(By.id('report-item-location-state')), 10000);
        await timeoutFunction(2);
        await state.sendKeys("CA");
        const zip = await driver.wait(until.elementLocated(By.id('report-item-location-zipCode')), 10000);
        await timeoutFunction(2);
        await zip.sendKeys("94086");
        const submit = await driver.wait(until.elementLocated(By.id('carc23-add-rest-submit-button')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submit);
        await timeoutFunction(2);
        await submit.click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        return driver;

    }catch(err){
        
        return driver;
    }
}


export default addRestaurant;