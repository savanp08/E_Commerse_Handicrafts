import { timeoutFunction } from "./HelperFunctions.js";
import { Builder, By, Key, until } from 'selenium-webdriver';

async function UserLogin(driver){
    try{
    const mainElement = await driver.get("http://localhost:3000/SignUp");
    const email = await driver.wait(until.elementLocated(By.id("user-login-email")), 10000);
    await email.sendKeys("saisree@gmail.com");
    await timeoutFunction(3);
    const password = await driver.wait(until.elementLocated(By.id("user-login-password")), 10000);
    await password.sendKeys("Password");
    await timeoutFunction(5);
    const fullName = await driver.wait(until.elementLocated(By.id("user-login-fullName")), 10000);
    await fullName.sendKeys("Sai Sree");
    const submit = await driver.wait(until.elementLocated(By.id("user-login-button")), 10000);
    await submit.click();
    await timeoutFunction(3);
    try{
        const assertElement = await driver.wait(until.elementLocated(By.id("login-helperText")), 10000);
        const text1=await assertElement.getText();
        console.log("test is =>",text1);
        if(text1==="Account Already Exists"){
            console.log("Assertion passed: user exists");
        }
    }catch(e){
        console.log("Error while Signing Up User",e);
    }
    try{
        const assertElement = await driver.wait(until.elementLocated(By.className('Home-Wrapper')), 10000);
        if(assertElement){
            console.log("User Signed Up Successfully");
        }
    }catch(err){
        console.log(err);
    }
    }
    catch(err){
        console.log(err);
    }
    return driver;
}

export default UserLogin;