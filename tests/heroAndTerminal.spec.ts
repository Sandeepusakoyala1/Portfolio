import { test, expect } from '../src/fixtures/testFixtures';
import { PORTFOLIO_DATA } from '../src/utils/testData';

test.describe('Hero Section & Terminal Simulator Suite', () => {

  test('TC-HERO-01: Verify hero profile, status pill and descriptions', async ({ portfolioPage }) => {
    const statusText = await portfolioPage.hero.getStatusText();
    expect(statusText).toContain(PORTFOLIO_DATA.hero.statusText);

    const heading = await portfolioPage.hero.getHeadingText();
    expect(heading).toBe(PORTFOLIO_DATA.hero.fullName);

    const role = await portfolioPage.hero.getRoleText();
    expect(role).toBe(PORTFOLIO_DATA.hero.role);

    const desc = await portfolioPage.hero.getDescriptionText();
    expect(desc).toContain(PORTFOLIO_DATA.hero.descriptionSubstring);
  });

  test('TC-HERO-02: Verify Get In Touch CTA navigates to contact section', async ({ portfolioPage }) => {
    await portfolioPage.hero.clickGetInTouch();
    await expect(portfolioPage.contact.footerSection).toBeVisible();
    const url = await portfolioPage.getUrl();
    expect(url).toContain('#contact');
  });

  test('TC-HERO-03: Verify LinkedIn CTA button attributes and security rel', async ({ portfolioPage }) => {
    const href = await portfolioPage.hero.getLinkedInHref();
    expect(href).toBe(PORTFOLIO_DATA.hero.linkedInUrl);

    const target = await portfolioPage.hero.getLinkedInTarget();
    expect(target).toBe('_blank');

    const rel = await portfolioPage.hero.getLinkedInRel();
    // Test will reveal if rel="noopener noreferrer" is missing (Security Bug)
    expect(rel).toBe('noopener noreferrer');
  });

  test('TC-TERM-01: Verify initial state of terminal simulator', async ({ portfolioPage }) => {
    await expect(portfolioPage.terminal.terminalBox).toBeVisible();
    await expect(portfolioPage.terminal.dots).toHaveCount(3);

    const btnText = await portfolioPage.terminal.getButtonText();
    expect(btnText).toContain(PORTFOLIO_DATA.terminal.initialBtnText);

    const isDisabled = await portfolioPage.terminal.isButtonDisabled();
    expect(isDisabled).toBe(false);
  });

  test('TC-TERM-02: Execute terminal simulation and verify live step execution', async ({ portfolioPage }) => {
    await portfolioPage.terminal.clickRunTestSuite();

    // Wait for the full test run simulation to complete (~2.5s)
    await portfolioPage.terminal.waitForExecutionToComplete(6000);

    const finalConsole = await portfolioPage.terminal.getConsoleText();
    expect(finalConsole).toContain(PORTFOLIO_DATA.terminal.expectedPassSummary);
    expect(finalConsole).toContain('100% Release Stability Index');

    const reRunBtnText = await portfolioPage.terminal.getButtonText();
    expect(reRunBtnText).toContain(PORTFOLIO_DATA.terminal.finishedBtnText);
  });

  test('TC-TERM-03: Verify terminal can be re-run after completion', async ({ portfolioPage }) => {
    await portfolioPage.terminal.clickRunTestSuite();
    await portfolioPage.terminal.waitForExecutionToComplete(6000);

    // Re-run
    await portfolioPage.terminal.clickRunTestSuite();
    await portfolioPage.terminal.waitForExecutionToComplete(6000);

    const finalConsole = await portfolioPage.terminal.getConsoleText();
    expect(finalConsole).toContain(PORTFOLIO_DATA.terminal.expectedPassSummary);
  });

});
