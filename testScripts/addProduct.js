import { Builder, By, Key , until } from 'selenium-webdriver';
import { timeoutFunction } from './HelperFunctions.js';


async function addProd(driver, studentid, bookid){
    try{
        console.log("Opening the Page :manage Books for task update book");
        await driver.get('http://localhost:3000/Admin/Account');
        await new Promise(resolve => setTimeout(resolve, 4000));

      const productsBtn = await driver.wait(until.elementLocated(By.className('pa31-tab-select-2')), 10000);
      await timeoutFunction(3);
      await productsBtn.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
         const cards = await driver.wait(until.elementsLocated(By.className('carcfp34-main-wrap')), 10000);
        await timeoutFunction(2);
        const firstCard = cards.length>1?  cards[1] : cards[0];
        const addBtn = await firstCard.findElement(By.id('carcfp34-option-button-add-product'));
        await timeoutFunction(2);
        await driver.executeScript("arguments[0].scrollIntoView(true);", addBtn);
        await addBtn.click();
        await timeoutFunction(4);
        const addBox = driver.wait(until.elementLocated(By.className('caap31-input-wrap')), 10000);
        await timeoutFunction(2);
        await driver.executeScript("arguments[0].scrollIntoView(true);", addBox);
        await timeoutFunction(2);
        const productName = await driver.wait(until.elementLocated(By.id('caap31-product-name')), 10000);
        await timeoutFunction(2);
        await productName.sendKeys("Pasta");
        await timeoutFunction(2);
        const productPrice = await driver.wait(until.elementLocated(By.id('caap31-product-price')), 10000);
        await timeoutFunction(2);
        await productPrice.sendKeys("10");
        await timeoutFunction(2);

        const submit = await driver.wait(until.elementLocated(By.id('caap31-add-product-button')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submit);
        await timeoutFunction(2);
        await submit.click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        return driver;

    }catch(err){
        console.log(err);
    }
    return driver;
}


export default addProd;