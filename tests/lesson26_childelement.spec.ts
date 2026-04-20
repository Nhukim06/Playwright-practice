import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// by partial text match
test.skip('example', async ({ page }) => {
    page.locator(':text("Using")').click()
})

test.skip('locating child elements', async ({ page }) => {
    //use space
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator(':text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    //have 4 nb-card, nth(3) is the 4th card Tất cả nb-card  →  lấy cái thứ 4  →  tìm button bên trong  →  click
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test.skip('locating parent elements', async ({ page }) => {
    //tro vao cai card. sau do tro vao email text box (getbyrole)
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ has: page.locator('[placeholder="Website"]') }).getByRole('button', { name: "SUBMIT" }).click()

    await page.locator('nb-card').filter({ has: page.locator('.size-medium') }).getByPlaceholder('Message').click()

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: "Email" }).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()
})

test.skip('Reusing locator', async ({ page }) => {
    //create constant de tranh duplication

    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })


    await emailField.fill('nhukim@gmail.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill('123456')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', { name: "SUBMIT" }).click()

    await expect(emailField).toHaveValue('nhukim@gmail.com')
})

test('extracting values', async ({ page }) => {
    //single test value'
    //Submit la text nam ben trong the html <button>Submit</button>
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text value
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 2')

    //input text
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('nhukim@gmail.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('nhukim@gmail.com')

    //getAttribute de lay gia tri cua mot HTML attribute vi du <input placeholder=="email" ==> email la value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')



})