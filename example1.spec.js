import {test, expect } from '@playwright/test';

test('Playwright Test1', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    console.log("This is my first Playwright Test");
});