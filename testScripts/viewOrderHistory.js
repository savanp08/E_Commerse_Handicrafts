import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';

async function viewOrderHistory(driver){
    try{
        await new Promise(resolve => setTimeout(resolve, 4000));
        await driver.get("http://localhost:3000/Account");
        await timeoutFunction(5);
        const cards = await driver.wait(until.elementsLocated(By.className('carcfp34-main-wrap')), 10000);
        await timeoutFunction(2);
       
      try{
        console.log("Assertion passed : ",cards.length ," orders found");
      }catch(err){
            console.log("Assertion failed : ",err);
      }
        await new Promise(resolve => setTimeout(resolve, 4000));
        return driver;

    }catch(err){
        
        return driver;
    }
}


export default viewOrderHistory;