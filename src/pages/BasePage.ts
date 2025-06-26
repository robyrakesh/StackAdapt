import { Page, Locator, expect } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(path: string = '') {
    await this.page.goto(path)
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded')
  }

  async waitForElement(locator: Locator, timeout: number = 10000) {
    await locator.waitFor({ state: 'visible', timeout })
  }

  async clickElement(locator: Locator, timeout: number = 10000) {
    await this.waitForElement(locator, timeout)
    await locator.click()
  }

  async fillInput(locator: Locator, text: string, timeout: number = 10000) {
    await this.waitForElement(locator, timeout)
    await locator.fill(text)
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator)
    return await locator.textContent() || ''
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible()
  }

  async expectElementVisible(locator: Locator) {
    await expect(locator).toBeVisible()
  }

  async expectElementContainsText(locator: Locator, text: string) {
    await expect(locator).toContainText(text)
  }

}
