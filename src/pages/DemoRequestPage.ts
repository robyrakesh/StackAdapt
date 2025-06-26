import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class DemoRequestPage extends BasePage {
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly businessEmailInput: Locator
  readonly phoneNumberInput: Locator
  readonly companyNameInput: Locator
  readonly jobTitleInput: Locator
  readonly companyTypeSelect: Locator
  readonly industrySelect: Locator
  readonly companySizeSelect: Locator
  readonly countrySelect: Locator
  readonly stateSelect: Locator
  readonly budgetSelect: Locator
  readonly workWithUsSelect: Locator
  readonly agreeCheckbox: Locator
  readonly submitButton: Locator

  readonly firstNameError: Locator
  readonly lastNameError: Locator
  readonly emailError: Locator
  readonly phoneError: Locator
  readonly companyError: Locator
  readonly jobTitleError: Locator
  readonly companyTypeError: Locator
  readonly companySizeError: Locator
  readonly countryError: Locator
  readonly budgetError: Locator
  readonly workWithUsError: Locator
  readonly agreeError: Locator
  readonly formTitle: Locator

  constructor(page: Page) {
    super(page)
    
    this.firstNameInput = page.locator('input[name="first_name"]')
    this.lastNameInput = page.locator('input[name="last_name"]')
    this.businessEmailInput = page.locator('input[type="email"]')
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone Number' })
    this.companyNameInput = page.getByRole('textbox', { name: 'Company Name' })
    this.jobTitleInput = page.getByRole('textbox', { name: 'Job Title' })

    this.companyTypeSelect = page.getByLabel('Company Type')
    this.industrySelect = page.getByLabel('Industry')
    this.companySizeSelect = page.getByLabel('Company Size')
    this.countrySelect = page.getByLabel('Company Country')
    this.stateSelect = page.locator('select[name="state"]')
    this.budgetSelect = page.getByLabel('Annual Programmatic Budget')
    this.workWithUsSelect = page.getByLabel('How are you looking to work')
    this.agreeCheckbox = page.locator('.sta-request-demo-form-check-label')
    this.submitButton = page.getByRole('button', { name: 'Submit' })
    this.firstNameError = page.getByText('Provide your first name.')
    this.lastNameError = page.getByText('Provide your last name.')
    this.emailError = page.getByText('Provide a valid business email.')
    this.phoneError = page.getByText('Provide a valid phone number.')
    this.companyError = page.getByText('Provide the name of the company you work for.')
    this.jobTitleError = page.getByText('Provide your job title.')
    this.companyTypeError = page.getByText('Tell us the type of company you work for.')
    this.companySizeError = page.getByText('Tell us the size of your company.')
    this.countryError = page.getByText('Tell us what country your company is in.')
    this.budgetError = page.getByText('Tell us your annual programmatic budget.')
    this.workWithUsError = page.getByText('Tell us how you are looking to work with us.')
    this.agreeError = page.getByText('Please agree in order for us')
    this.formTitle = page.locator('h1').first()
  }

  async fillDemoForm(formData: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    company: string
    jobTitle: string
    companyType?: string
    industry?: string
    companySize?: string
    country?: string
    state?: string
    budget?: string
    workWithUs?: string
    agreeToTerms?: boolean
  }) {
    if (await this.isElementVisible(this.firstNameInput)) {
      await this.fillInput(this.firstNameInput, formData.firstName)
    }
    if (await this.isElementVisible(this.lastNameInput)) {
      await this.fillInput(this.lastNameInput, formData.lastName)
    }
    if (await this.isElementVisible(this.businessEmailInput)) {
      await this.fillInput(this.businessEmailInput, formData.email)
    }
    if (await this.isElementVisible(this.companyNameInput)) {
      await this.fillInput(this.companyNameInput, formData.company)
    }
    if (await this.isElementVisible(this.jobTitleInput)) {
      await this.fillInput(this.jobTitleInput, formData.jobTitle)
    }
    if (formData.phone && await this.isElementVisible(this.phoneNumberInput)) {
      await this.phoneNumberInput.fill(formData.phone)
    }
    if (formData.companyType && await this.isElementVisible(this.companyTypeSelect)) {
      await this.selectOption(this.companyTypeSelect, formData.companyType)
    }
    if (formData.industry && await this.isElementVisible(this.industrySelect)) {
      await this.selectOption(this.industrySelect, formData.industry)
    }
    if (formData.companySize && await this.isElementVisible(this.companySizeSelect)) {
      await this.selectOption(this.companySizeSelect, formData.companySize)
    }
    if (formData.country && await this.isElementVisible(this.countrySelect)) {
      await this.selectOption(this.countrySelect, formData.country)
    }
    if (formData.state && await this.isElementVisible(this.stateSelect)) {
      await this.selectOption(this.stateSelect, formData.state)
    }
    if (formData.budget && await this.isElementVisible(this.budgetSelect)) {
      await this.selectOption(this.budgetSelect, formData.budget)
    }
    if (formData.workWithUs && await this.isElementVisible(this.workWithUsSelect)) {
      await this.selectOption(this.workWithUsSelect, formData.workWithUs)
    }

    if (formData.agreeToTerms && await this.isElementVisible(this.agreeCheckbox)) {
      const isChecked = await this.agreeCheckbox.isChecked()
      if (!isChecked) {
        await this.agreeCheckbox.check()
      }
    }
  }

  async selectOption(selectElement: Locator, optionText: string) {
    await this.waitForElement(selectElement)
    await selectElement.selectOption({ label: optionText })
  }

  async submitFormWithRetry() {
    const maxRetries = 5 
    let attempt = 0

    while (attempt < maxRetries) {
      attempt++
      console.log(`Form submission attempt ${attempt}/${maxRetries}`)
      await this.clickElement(this.submitButton)
      
      try {
        await this.page.getByRole('heading', { name: 'Thank you!' }).waitFor({ state: 'visible', timeout: 10000 })
        console.log(`Form submitted successfully on attempt ${attempt}`)
        return
      } catch (error) {
        try {
          const recaptchaError = this.page.getByText('reCAPTCHA Validation Failed.')
          await recaptchaError.waitFor({ timeout: 3000 })
          console.log(`reCAPTCHA validation failed on attempt ${attempt}, retrying...`)
        } catch (recaptchaError) {
          console.log(`No reCAPTCHA error found on attempt ${attempt}, but no success message either`)
        }
      }
    }
    throw new Error(`Form submission failed after ${maxRetries} attempts`)
  }

  async submitForm() {
    if (await this.isElementVisible(this.submitButton)) {
      await this.clickElement(this.submitButton)
    }
  }

  async getFormTitle(): Promise<string> {
    return await this.getText(this.formTitle)
  }

  async hasValidationErrors(): Promise<boolean> {
    const errors = [
      this.firstNameError,
      this.lastNameError,
      this.emailError,
      this.phoneError,
      this.companyError,
      this.jobTitleError,
      this.companyTypeError,
      this.companySizeError,
      this.countryError,
      this.budgetError,
      this.workWithUsError,
      this.agreeError
    ]

    for (const error of errors) {
      if (await this.isElementVisible(error)) {
        return true
      }
    }
    return false
  }

  async verifyFormLoaded() {
    await this.page.locator('h2').filter({ hasText: 'Request a Demo' }).waitFor({ state: 'visible' })
    await this.firstNameInput.waitFor({ state: 'visible' })
    await this.lastNameInput.waitFor({ state: 'visible' })
  }
}
