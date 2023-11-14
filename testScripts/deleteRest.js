import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';

async function delRestaurant(driver){
    try{
        await new Promise(resolve => setTimeout(resolve, 4000));
        await driver.get("http://localhost:3000/Admin/Account");
        await timeoutFunction(5);
        const cards = await driver.wait(until.elementsLocated(By.className('crc25-main-wrap')), 10000);
        await timeoutFunction(2);
        const firstCard = cards[0];
        const editBtn = await firstCard.findElement(By.id('crc25-delete-button'));
        await timeoutFunction(2);
        await driver.executeScript("arguments[0].scrollIntoView(true);", editBtn);
        await timeoutFunction(2);
        await editBtn.click();
        await timeoutFunction(4);
      
        await submit.click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        return driver;

    }catch(err){
        
        return driver;
    }
}


export default delRestaurant;