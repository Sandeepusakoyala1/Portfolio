import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Responsive & Mobile Adaptability Suite', () => {

  test('TC-RESP-01: Check mobile navigation menu accessibility (<640px)', async ({ portfolioPage }) => {
    // Set viewport to mobile phone (390x844 - iPhone 12/13/14 size)
    await portfolioPage.page.setViewportSize({ width: 390, height: 844 });

    // The nav links list is hidden via CSS @media (max-width: 640px)
    const isNavLinksVisible = await portfolioPage.navBar.areNavLinksVisible();

    // Check if there is an alternative mobile navigation mechanism (hamburger button)
    const hamburgerBtn = portfolioPage.page.locator('header button.hamburger, header .mobile-menu-btn, header [aria-label*="menu"]');
    const hasHamburger = (await hamburgerBtn.count()) > 0;

    // Defect Assertion: If nav links are hidden, there MUST be a mobile menu button to access navigation!
    expect(
      hasHamburger || isNavLinksVisible,
      'BUG DETECTED: On mobile viewports (<640px), navigation links are completely hidden with no hamburger toggle!'
    ).toBe(true);
  });

  test('TC-RESP-02: Verify hero layout responds to mobile viewports without horizontal scrolling', async ({ portfolioPage }) => {
    await portfolioPage.page.setViewportSize({ width: 375, height: 667 });

    const scrollWidth = await portfolioPage.page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await portfolioPage.page.evaluate(() => document.documentElement.clientWidth);

    // Should not cause unwanted horizontal overflow
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  test('TC-RESP-03: Verify company experience tabs wrap or become scrollable on tablet/mobile', async ({ portfolioPage }) => {
    await portfolioPage.page.setViewportSize({ width: 768, height: 1024 });

    const companyNav = portfolioPage.page.locator('.company-nav');
    await expect(companyNav).toBeVisible();

    // Test clicking tabs on tablet viewport
    await portfolioPage.experience.selectTabByCompany('Ivy Comptech');
    const activeTab = await portfolioPage.experience.getActiveTabName();
    expect(activeTab).toBe('Ivy Comptech');
  });

});
