import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  // Header elements
  readonly logo: Locator
  readonly login: Locator
  readonly requestDemoButton: Locator
  readonly productMenu: Locator
  readonly channelsMenu: Locator
  readonly solutionsMenu: Locator
  readonly whyStackAdaptMenu: Locator
  readonly careersMenu: Locator
  readonly resourcesMenu: Locator

  constructor(page: Page) {
    super(page)
    
    this.logo = page.getByRole('link', { name: 'StackAdapt Logo' })
    this.login = page.getByRole('link', { name: 'Log In' })
    this.requestDemoButton = page.locator('a[href*="get-started"]').first()
    this.productMenu = page.getByRole('link', { name: 'Product' })
    this.channelsMenu = page.getByRole('link', { name: 'Channels' })
    this.solutionsMenu = page.getByRole('link', { name: 'Solutions' }).first()
    this.whyStackAdaptMenu = page.getByRole('link', { name: 'Why StackAdapt?' })
    this.careersMenu = page.getByRole('banner').getByRole('link', { name: 'Careers' })
    this.resourcesMenu = page.getByRole('banner').getByRole('link', { name: 'Resources', exact: true })
  }

  async navigateToHome() {
    await this.goto('/')
    await this.waitForPageLoad()
  }

  async clickLogin() {
    await this.clickElement(this.login)
  }

  async verifyPageLoaded() {
    await this.expectElementVisible(this.logo)
    await this.expectElementVisible(this.login)
  }
}
