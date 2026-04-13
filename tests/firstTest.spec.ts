import { test } from '@playwright/test';

//main befor each hook

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})

test.describe('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByRole('link', { name: 'Charts', exact: true }).click()

    })

    test('the first test', async ({ page }) => {
        await page.getByRole('link', { name: 'Echarts' }).click()
    })

})

test.describe('suite2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('the first test1', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})



//hook - run before each test case


//hool - run before all tc - like a general precondition before the execution
//test.beforeAll(()=>{})



