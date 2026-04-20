import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) //test suite (default +2000)

})

test.skip('auto waiting', async ({ page }) => {
    //khi an nut va hien message
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //text content se chu dong doi nhung alltextcontent se tra ve ngay
    //cach 1
    //const successContent = await successButton.textContent()
    //Phần tử đó đã tồn tại trong mã nguồn HTML (DOM) của trang web. //visible: hien len UI
    //cach 2
    // await successButton.waitFor({ state: 'attached' })
    // const successContent = await successButton.allTextContents()
    // expect(successContent).toContain('Data loaded with AJAX get request.')

    //cach 3
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })

})

test.skip('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //__wait for element
    //await page.waitForSelector('.bg-success')

    //__wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //__wait for network calls to be completed ('not recommmended)
    //await page.waitForLoadState('networkidle')

    //__wait for a specific amount of time
    await page.waitForTimeout(10000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')


})
//timeout: global timeout > test timeout (30000) > action timeout;navigation timeout;expect timeout (5000)

test('timeouts', async ({ page }) => {
    //test.setTimeout(10000)
    test.slow() //3x testtimeout
    const successButton = page.locator('.bg-success')

    await successButton.click({ timeout: 16000 }) //overide actiontimeout in the confid

})