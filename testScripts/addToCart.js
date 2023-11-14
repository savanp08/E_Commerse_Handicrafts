import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';

async function addToCart(driver){
    try{

        console.log("In Page add to cart", );
        await driver.get('http://localhost:3000/Description/6553d6d350ad7c20590247a3/6553d0ef00b0a9ceab6bd3de')
        await driver.sleep(5000);
        await timeoutFunction(8);
        
        const cartNum = await driver.wait(until.elementLocated(By.className('cnm1220-cartIcon')), 10000);
        console.log("found add to cart btn")
        var text1=0;
        try{
            text1=await cartNum.getText();
            if(text1) text1=text1/1;
            console.log(text1);
        }
        catch(err){
            console.log(err);
        }
       const cartBtn = await driver.wait(until.elementLocated(By.className('pd191-addtocart-button')), 10000);
        await timeoutFunction(3);
        await driver.executeScript("arguments[0].scrollIntoView(true);", cartBtn);
        console.log("scrolled add to cart btn")
        await timeoutFunction(3);
        await cartBtn.click();
        console.log("clicked add to cart btn")
        await timeoutFunction(5);
        const afterCartNum = await driver.wait(until.elementLocated(By.className('cnm1220-cartIcon')), 10000);
        var text2=0;
        try{
            text2=await afterCartNum.getText();
            if(text2) text2=text2/1;
            console.log(text2);
        }
        catch(err){
            console.log(err);
        }
        if(text2===text1+1){
            console.log("Assertion passed: cart number increased");
        }
        return driver;

    }catch(err){
        
        return driver;
    }
}


export default addToCart;