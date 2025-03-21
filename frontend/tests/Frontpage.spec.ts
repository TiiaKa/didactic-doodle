import { test, expect } from '@playwright/test';

// Define the application's local address
const appAddress = 'http://localhost:5173';

test('Adding feeds to a list', async ({ page }) => {
    // Generate random strings for name and email to ensure uniqueness
    const name = (Math.random() + 1).toString(36).substring(7);
    const email = name + '@' + (Math.random() + 1).toString(36).substring(7) + '.io';

    // Navigate to the application's main page
    await page.goto(appAddress);

    // Fill the input fields with the generated name and email
    await page.fill("input#formName", name);
    await page.fill("input#formEmail", email);

    // Click the "Create" button to submit the form
    await page.click('button:has-text("Create")');

    // Wait until at least one user appears in the list, ensuring the update was successful
    await page.waitForSelector('.list-group-item');

    // Select the last user added to the list
    const lastUser = page.locator('.list-group-item').last();

    // Verify that the last user displayed matches the generated name and email
    await expect(lastUser).toHaveText(`${name} (${email})`);
});