import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DemoRequestPage } from '../pages/DemoRequestPage';

// Extend the base test with custom fixtures
export const test = base.extend<{
  homePage: HomePage;
  demoRequestPage: DemoRequestPage;
}>({
  // HomePage fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // DemoRequestPage fixture
  demoRequestPage: async ({ page }, use) => {
    const demoRequestPage = new DemoRequestPage(page);
    await use(demoRequestPage);
  },
});

export { expect } from '@playwright/test'; 