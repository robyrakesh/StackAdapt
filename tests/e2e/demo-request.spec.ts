import { test, expect } from '../../src/fixtures/testFixtures'
import { TestData } from '../../src/utils/TestData'

test.describe('StackAdapt Demo Request Form Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome()
    await homePage.clickElement(homePage.requestDemoButton)
  })

  test('should load demo request page successfully', async ({ demoRequestPage }) => {
    await demoRequestPage.verifyFormLoaded()
    expect(await demoRequestPage.getFormTitle()).toContain('Maximize Your Advertising')
  })

  test('should submit form with valid data', async ({ demoRequestPage, page }) => {
    test.setTimeout(60000) // Set timeout to 60 seconds

    // Fill form with valid data
    await demoRequestPage.fillDemoForm(TestData.validDemoFormData)

    // Submit the form with reCAPTCHA retry logic
    await demoRequestPage.submitFormWithRetry()

    await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible()
  })

  test('should validate required fields', async ({ demoRequestPage }) => {
    // Try to submit empty form
    await demoRequestPage.submitForm()

    // Verify validation errors are displayed
    const hasErrors = await demoRequestPage.hasValidationErrors()
    expect(hasErrors).toBeTruthy()
  })
})
