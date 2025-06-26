import { TestData } from '@utils/TestData';
import { test, expect } from '../../src/fixtures/testFixtures';

test.describe('StackAdapt Homepage Tests', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
  });

  test('should load homepage successfully', async ({ homePage }) => {
    const menuItems = [
        homePage.productMenu,
        homePage.channelsMenu,
        homePage.solutionsMenu,
        homePage.whyStackAdaptMenu,
        homePage.careersMenu,
        homePage.resourcesMenu
      ];
    await homePage.verifyPageLoaded();
    for (const menuItem of menuItems) {
        try {
          await homePage.expectElementVisible(menuItem);
        } catch (err) {
          throw new Error(`Menu item not visible: ${menuItem}`);
        }
      }
  });

  test('should error out for invalid user', async ({ homePage, page }) => {
    await homePage.clickLogin();
    await homePage.fillInput(page.locator('input[type="email"]'), TestData.testUsers.invalidUser.email);
    await homePage.fillInput(page.locator('input[type="password"]'), TestData.testUsers.invalidUser.password);
    await homePage.clickElement(page.locator('[data-testid="login-button"]'));
    await expect(page.getByText('Invalid email or password.')).toBeVisible();
  });

  
}); 