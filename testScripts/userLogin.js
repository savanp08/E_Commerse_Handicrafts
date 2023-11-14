import { timeoutFunction } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function UserLogin(driver){
    try{
    const mainElement = await driver.get("http://localhost:3000/Login");
    const email = await driver.wait(until.elementLocated(By.id("user-login-email")), 10000);
    await email.sendKeys("saisree@gmail.com");
    await timeoutFunction(3);
    const password = await driver.wait(until.elementLocated(By.id("user-login-password")), 10000);
    await password.sendKeys("Password");
    await timeoutFunction(5);
    
    const submit = await driver.wait(until.elementLocated(By.id("user-login-button")), 10000);
    await submit.click();
    timeoutFunction(3);
    try{
        const assertElement = await driver.wait(until.elementLocated(By.className('Home-Wrapper')), 10000);
        if(assertElement){
            console.log("User Signed Up Successfully");
        }
    }catch(e){
        console.log("Error while Signing Up User",e);
    }
    }
    catch(err){
        console.log(err);
    }
    return driver;
}

export default UserLogin;