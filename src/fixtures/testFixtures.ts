import { test as base } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';
import { ConsoleListener } from '../utils/consoleListener';

type TestFixtures = {
  portfolioPage: PortfolioPage;
  consoleListener: ConsoleListener;
};

export const test = base.extend<TestFixtures>({
  consoleListener: async ({ page }, use) => {
    const listener = new ConsoleListener(page);
    await use(listener);
  },
  portfolioPage: async ({ page }, use) => {
    const portfolioPage = new PortfolioPage(page);
    await portfolioPage.loadPortfolio();
    await use(portfolioPage);
  },
});

export { expect } from '@playwright/test';
