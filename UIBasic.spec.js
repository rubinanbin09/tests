import { test, expect } from '@playwright/test';

test('Playwright Test1', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  console.log(await page.title());
  expect(await page.title()).toBe('Test Login | Practice Test Automation');
});

test('Login Check', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const signInBtn = page.locator('#signInBtn');
  const cardTitles = page.locator(".card-body .card-title a");
  await userName.fill('rahulshetty');
  await password.fill('Learning@830$3mK2');
  await signInBtn.click();
  // check if login succeeded by checking the URL
  //await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
  //await page.locator("[style='text-align: center;']").isVisible();
  const error_display = await page.locator("[style='display: block;']").textContent();
  console.log(error_display);
  await expect (page.locator("[style='display: block;']")).toContainText("Incorrect");
  await userName.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await signInBtn.click();
  console.log("Successfully logged in");
  //console.log(await cardTitles.first().textContent());//display first card title
  //console.log(await cardTitles.nth(1).textContent()); //display second card title
  //allTextContents() - returns an array of text contents for all elements matching the locator 
  //Unless textContent is used, allTextContents() will not work and will return an empty array. This is because allTextContents() relies on the textContent property of each element to retrieve the text, and if textContent is not used, it may not be able to access the text content of the elements correctly.
  await page.waitForLoadState('networkidle'); // Wait for the page to load completely before logging the titles   
  const allTitles = await cardTitles.allTextContents();
  //This will not print the array directly, but will log the contents of the array to the console. Each title will be printed on a new line.    
  console.log(allTitles);
});

test ('Login Check2', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const link = page.locator("[href*='documents-request']"); // This will locate the link element that contains the text "documents-request" in its href attribute. The * symbol is a wildcard that matches any characters before or after "documents-request". This allows you to locate the link even if there are additional parameters or variations in the URL.   
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.customradio').nth(1).click(); // This will click on the second radio button, which is associated with the "consult" option in the dropdown. The nth(1) selector is used to target the second radio button, as the index starts from 0.
    await page.locator('#okayBtn').click(); // This will click on the "Okay" button that appears after selecting the "consult" option from the dropdown. This step is necessary to confirm the selection and proceed with the login process.    
    await expect(page.locator('.customradio').nth(1)).toBeChecked(); // This will check if the second radio button is selected after selecting the "consult" option from the dropdown. If the assertion fails, it will throw an error indicating that the expected radio button is not checked.
    await page.locator('#terms').check(); // This will check the checkbox with the id "terms". This step is necessary to agree to the terms and conditions before proceeding with the login process.
    //expect(await page.locator('#terms').isChecked()).toBeFalsy(); // This will check if the checkbox with the id "terms" is not checked. If the assertion fails, it will throw an error indicating that the expected checkbox is still checked. This step is important to ensure that the user has not accidentally left the checkbox checked, which could lead to unintended consequences.
    await expect(link).toHaveAttribute('class', 'blinkingText'); // This will check if the link with the locator "documentsLink" has the class attribute "blinkingText". If the assertion fails, it will throw an error indicating that the expected class attribute is not present on the link element. This step is important to verify that the link is styled correctly and stands out to users.
    await signInBtn.click();
});

test ('UI Check', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const link = page.locator("[href*='documents-request']");
    const [pageArray] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new page to open after clicking the link
        link.click()])
    console.log(await pageArray.title()); // This will log the title of the newly opened page to the console. This step is important to verify that the link is working correctly and leads to the expected page.
    const text = await pageArray.locator('.red').textContent(); // This will locate the element with the class "red" on the newly opened page and retrieve its text content. This step is important to verify that the expected content is present on the page and can be accessed correctly.
    console.log(text); // This will log the retrieved text content to the console. This step is important to verify that the expected content is correct and can be displayed properly.
    await page.locator('#username').fill('Rubin');
    console.log(await page.locator('#username').inputValue());   // This will type the retrieved text content into the input field with the id "username" on the original page. This step is important to verify that the retrieved content can be used correctly and interacts with the original page as expected.
    // inputValue() is used to retrieve the value during the runtime whereas textContent() is used to retrieve the value that is attached to the DOM
});

test ('Ecommerce Sample', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    await username.fill('anbin.rubin@gmail.com');
    await password.fill('Nagercoil382_');
    await loginBtn.click();
    await page.waitForLoadState('networkidle'); // Wait for the page to load completely before proceeding with the next steps
    const titilesALL = await page.locator('.card-body b').first().textContent(); 
    //console.log(titilesALL);
    const products = page.locator('.card-body');
    const count = await products.count();
    const productname = "Zara Coat 4";
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productname) {
            console.log(await products.nth(i).locator('b').textContent());
            //Add to Cart
            await products.nth(i).locator('text= Add To Cart').click();
            break; //Ending the for loop since we found the product and added it to the cart. This will prevent unnecessary iterations and improve the efficiency of the code.
        }
    }
    await page.pause();


});

test ('Ecommerce Sample1', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    await username.fill('anbin.rubin@gmail.com');
    await password.fill('Nagercoil382_');
    await loginBtn.click();
    await page.waitForLoadState('networkidle'); // Wait for the page to load completely before proceeding with the next steps
    const titilesALL = await page.locator('.card-body b').first().textContent(); 
    //console.log(titilesALL);
    const products = page.locator('.card-body');
    const count = await products.count();
    const productname = "Zara Coat 4";
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productname) {
            console.log(await products.nth(i).locator('b').textContent());
            //Add to Cart
            await products.nth(i).locator('text= Add To Cart').click();
            break; //Ending the for loop since we found the product and added it to the cart. This will prevent unnecessary iterations and improve the efficiency of the code.
        }
    }
    await page.pause();
});
