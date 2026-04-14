import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test.skip('locator syntax rules', async ({ page }) => {
    //by Tag name, input co nhieu element ne can first() or last()
    await page.locator('input').first().click()

    //by ID (#) click have promise nen need await, locator khong co nen khong can
    await page.locator('#inputEmail1').click()


    //by class value (.)
    page.locator('.shape-rectangle')

    //by attribute ([] )
    page.locator('[placeholder="Email"]')

    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors - no space between them and nam trong cung 1 tag
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath
    page.locator('//*[@id="idEmail"]')

    //by css
    page.locator('input[type="email"]')

    // by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

})

test("User facing locators", async ({ page }) => {
    //text box have the email text
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'SUBMIT' }).last().click()
    await page.getByRole('button', { name: 'Send' }).click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click() //title atttribute

    //check from the source code (search)
    await page.getByTestId('SignIn').click()
})