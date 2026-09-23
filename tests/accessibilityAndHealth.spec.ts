import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Accessibility, Meta & Runtime Health Suite', () => {

  test('TC-HEALTH-01: Verify page loads without runtime console errors or uncaught exceptions', async ({ portfolioPage, consoleListener }) => {
    // Wait for Three.js animations to initialize
    await portfolioPage.page.waitForTimeout(1000);

    const errors = consoleListener.getErrors();
    const uncaught = errors.filter(e => e.type === 'uncaught-exception' || e.type === 'error');

    expect(uncaught, `Found browser console errors: ${JSON.stringify(uncaught)}`).toHaveLength(0);
  });

  test('TC-HEALTH-02: Verify no network asset requests fail (404/500)', async ({ portfolioPage, consoleListener }) => {
    const failed = consoleListener.getFailedRequests();
    expect(failed, `Found failed network requests: ${JSON.stringify(failed)}`).toHaveLength(0);
  });

  test('TC-HEALTH-03: Verify Three.js 3D WebGL Canvas is initialized and mounted', async ({ portfolioPage }) => {
    const isCanvasPresent = await portfolioPage.is3DCanvasPresent();
    expect(isCanvasPresent).toBe(true);
  });

  test('TC-A11Y-01: Verify WAI-ARIA tab pattern on experience component', async ({ portfolioPage }) => {
    const tabBtns = portfolioPage.page.locator('.company-btn');
    const firstTab = tabBtns.first();

    const role = await firstTab.getAttribute('role');
    const ariaSelected = await firstTab.getAttribute('aria-selected');

    // WCAG & WAI-ARIA tab pattern requirement
    expect(role, 'Company tabs should have role="tab"').toBe('tab');
    expect(ariaSelected, 'Active tab should have aria-selected="true"').toBe('true');
  });

  test('TC-A11Y-02: Verify interactive terminal has accessible aria-live region', async ({ portfolioPage }) => {
    const terminalConsole = portfolioPage.page.locator('#test-console');
    const ariaLive = await terminalConsole.getAttribute('aria-live');

    expect(ariaLive, 'Dynamic log console should have aria-live="polite" for screen readers').toBe('polite');
  });

  test('TC-SEO-01: Verify primary SEO meta tags and social open-graph tags', async ({ portfolioPage }) => {
    const metaDesc = portfolioPage.page.locator('meta[name="description"]');
    const count = await metaDesc.count();
    expect(count, 'Page should have a <meta name="description"> tag for SEO').toBeGreaterThan(0);

    const ogTitle = portfolioPage.page.locator('meta[property="og:title"]');
    expect(await ogTitle.count(), 'Page should have an Open Graph og:title tag').toBeGreaterThan(0);
  });

});
