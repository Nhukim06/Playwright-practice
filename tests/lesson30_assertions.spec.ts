import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('assertions', async ({ page }) => {
    //general assertion 
    const value = 5
    const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('Button')

    expect(value).toEqual(5)

    //kiem tra truc tiep, khong doi

    const buttonText = await basicFormButton.textContent()
    expect(buttonText).toEqual('Submit')

    //locator assertion -- dung cho UI element thong qua locator va co await
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion -- test can be continue the execution even if the assertion is failed
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})
