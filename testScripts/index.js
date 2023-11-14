import { Builder, By, Key, until } from 'selenium-webdriver';
import userLogin from './userLogin.js';
import userSignUp from './userSignUp.js';
import adminLogin from './Login.js';

import adminLogout from './Logout.js';
import fs from 'fs';
import { reverse } from 'dns';
import addRestaurant from './addRestaurant.js';
import editRestaurant from './editRestaurant.js';
import addProd from './addProduct.js';
import delRestaurant from './deleteRest.js';
import addToCart from './addToCart.js';
import viewOrderHistory from './viewOrderHistory.js';

async function test() {
    // Create a new WebDriver instance (Chrome in this case)
    const driver = new Builder()
      .forBrowser('chrome')
      .build();

      function updateTable(sn, functionName, result) {
        // Read the report.html file
        fs.readFile('./report.html', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
  
          // Find the table element in the HTML content
          const tableStartIndex = data.indexOf('<tbody>')+'<tbody>'.length-2;
          const tableEndIndex = data.indexOf('</tbody>') -1;
          const tableContent = data.substring(tableStartIndex, tableEndIndex);
  
          // Find the table body element in the HTML content
          const tbodyStartIndex = tableContent.indexOf('<tbody>') + '<tbody>'.length-2;
          const tbodyEndIndex = tableContent.indexOf('</tbody>') -1;
          const tbodyContent = tableContent.substring(tbodyStartIndex, tbodyEndIndex);
  
          // Create a new row for the table body
          const newRow = `<tr><td>${sn}</td><td>${functionName}</td><td class="${result === 'Passed' ? 'passed' : 'failed'}">${result === 'Passed' ? 'Passed' : 'Failed'}</td></tr>`;
          
          // Insert the new row into the table body
          const newTbodyContent = `${tbodyContent}\n${newRow}`;
         // console.log(newTbodyContent)
          
  
          // Replace the old table body content with the new one
          const newTableContent = tableContent.replace(tbodyContent, newTbodyContent);
  
          // Replace the old table content with the new one
          const newHtmlContent = data.replace(tableContent, newTableContent);
        //  console.log(newHtmlContent);
          // Write the modified HTML content back to the report.html filel
  
          fs.writeFile('./report.html', newHtmlContent, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
  
            console.log(`Added ${functionName} to report.html`);
          });
        });
      }
    
    // Function to clear all rows from the table
    
    

      try{
         console.log("Opening the First Page : SignUp");
       // Navigate to the Signup page
        const userSignUpCall = await userSignUp(driver);
        const userSignUpCall1 = await userSignUp(driver);
        if(userSignUpCall)
        updateTable(1, 'User SignUp', 'Passed');
        await new Promise(resolve => setTimeout(resolve, 2000));
        if(userSignUpCall){
            console.log("Opening the Page :Admin Login");
            const adminLoginCall = await adminLogin(driver);
            if(adminLoginCall)
            updateTable(2, 'Admin Login', 'Passed');
            await new Promise(resolve => setTimeout(resolve, 2000));
            if(adminLoginCall){
                console.log("Now in admin dashboard");
                const addNewRest = await addRestaurant(adminLoginCall);
                if(addNewRest)
                updateTable(3, 'Add Restaurant', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const editRest = await editRestaurant(driver);
                if(editRest)
                updateTable(4, 'Edit Restaurant', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                const addProdX = await addProd(driver);
                if(addProdX)
                updateTable(5, 'Add Product', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));

                const delRest = await delRestaurant(driver);
                if(delRest)
                updateTable(6, 'delete Restaurant', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));
                if(delRest){
                const adminLogoutCall = await adminLogout(driver);
                if(adminLogoutCall)
                updateTable(11, 'Admin Logout', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));
                const userLoginCall = await userLogin(driver);
                if(userLoginCall)
                updateTable(12, 'User Login', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));

                const addToCartEle = await addToCart(driver);
                if(addToCartEle)
                updateTable(13, 'Add To Cart', 'Passed');
                await new Promise(resolve => setTimeout(resolve, 2000));
                if(addToCart){
                  const viewOrders = await viewOrderHistory(driver);
                  if(viewOrders)
                  updateTable(14, 'view Order History', 'Passed');
                }
                }
            }
        }
        // Navigate to the login page
        // const userLoginCall = await userLogin(driver);
        // if(userLoginCall){
        //     console.log("Opening the Second Page : dashboard");
        //     // const title = await driver.getTitle();
        //     // console.log(title);
        //     // if(title === 'Dashboard'){
        //     //     console.log('Test Passed');
        //     // }

        // }

      }catch(err){
        console.log(err);
       
      }
    }
    

// Function to clear the table



function clearTable(){
    fs.readFile('./report.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const tableStartIndex = data.indexOf('<tbody>');
          const tableEndIndex = data.indexOf('</tbody>') + '</table>'.length;
          const tableContent = data.substring(tableStartIndex, tableEndIndex);

          const newHtmlContent = data.replace(tableContent, '<tbody> \n\n</tbody>');
  
          // Write the modified HTML content back to the report.html filel
  
          fs.writeFile('./report.html', newHtmlContent, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
        });

    })
}



clearTable();
test();