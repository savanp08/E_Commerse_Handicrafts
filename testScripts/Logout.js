import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';


async function adminLogout(driver){
    try{
        await driver.get('http://localhost:3000/Admin/Account');
        await new Promise(resolve => setTimeout(resolve, 5000));
         driver.manage().window().maximize();
      const logOutEle = await driver.wait(until.elementLocated(By.id('navBar45-main-logout')), 10000);
        await timeoutFunction(3);
        await logOutEle.click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        return driver;

    }catch(err){
        console.log(err);
    }
    return driver;
}


export default adminLogout;