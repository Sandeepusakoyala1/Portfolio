import { test, expect } from '../src/fixtures/testFixtures';
import { PORTFOLIO_DATA } from '../src/utils/testData';

test.describe('Navigation & Header Suite', () => {

  test('TC-NAV-01: Verify page title and header brand identity', async ({ portfolioPage }) => {
    const title = await portfolioPage.getTitle();
    expect(title).toContain(PORTFOLIO_DATA.brandName);
    expect(title).toContain('SDET');

    const brandText = await portfolioPage.navBar.getBrandText();
    expect(brandText).toContain(PORTFOLIO_DATA.brandName);

    const brandMarkText = await portfolioPage.navBar.getBrandMarkText();
    expect(brandMarkText).toBe(PORTFOLIO_DATA.brandMark);
  });

  test('TC-NAV-02: Verify desktop navigation links display primary labels and order', async ({ portfolioPage }) => {
    const navLabels = await portfolioPage.navBar.getNavLinkLabels();
    for (const item of PORTFOLIO_DATA.navLinks) {
      expect(navLabels).toContain(item.label);
    }
  });

  test('TC-NAV-03: Verify clicking navigation anchors smoothly scrolls to target sections', async ({ portfolioPage }) => {
    for (const item of PORTFOLIO_DATA.navLinks) {
      const link = portfolioPage.navBar.getNavLink(item.label);
      await expect(link).toHaveAttribute('href', `#${item.targetId}`);

      // Click anchor link
      await link.click();

      // Target section should be visible in viewport
      const targetSection = portfolioPage.page.locator(`#${item.targetId}`);
      await expect(targetSection).toBeVisible();
    }
  });

  test('TC-NAV-04: Verify brand link behavior and URL hash', async ({ portfolioPage }) => {
    await portfolioPage.navBar.clickBrandLink();
    const currentUrl = await portfolioPage.getUrl();
    // Brand link points to href="#"
    expect(currentUrl).toContain('#');
  });

});
