import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// by partial text match
test.skip('example', async ({ page }) => {
    page.locator(':text("Using")').click()
})

test('locating child elements', async ({ page }) => {
    //use space
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator(':text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    //have 4 nb-card, nth(3) is the 4th card Tất cả nb-card  →  lấy cái thứ 4  →  tìm button bên trong  →  click
    await page.locator('nb-card').nth(3).getByRole('button').click()
})