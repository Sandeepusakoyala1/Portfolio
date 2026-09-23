import { test, expect } from '../src/fixtures/testFixtures';
import { PORTFOLIO_DATA } from '../src/utils/testData';

test.describe('Experience, Skills & AI Innovations Suite', () => {

  test('TC-BENTO-01: Verify Bento stats cards and initial rendering', async ({ portfolioPage }) => {
    const cardCount = await portfolioPage.bentoStats.getCardCount();
    expect(cardCount).toBe(4);

    const labels = await portfolioPage.bentoStats.getCardLabels();
    for (const stat of PORTFOLIO_DATA.bentoStats) {
      expect(labels).toContain(stat.label);
    }

    // Scroll to bento cards to trigger counter
    await portfolioPage.scrollToElement(portfolioPage.bentoStats.bentoSection);

    // Counter should animate to 5+
    await expect(async () => {
      const counterVal = await portfolioPage.bentoStats.getCurrentCounterValue();
      expect(counterVal).toMatch(/5\+/);
    }).toPass({ timeout: 3000 });
  });

  test('TC-AI-01: Verify AI innovation cards render with expected titles and copy', async ({ portfolioPage }) => {
    const cardCount = await portfolioPage.aiShowcase.getCardCount();
    expect(cardCount).toBe(PORTFOLIO_DATA.aiInnovations.length);

    const titles = await portfolioPage.aiShowcase.getCardTitles();
    for (const expectedTitle of PORTFOLIO_DATA.aiInnovations) {
      const match = titles.some(t => t.includes(expectedTitle));
      expect(match).toBe(true);
    }
  });

  test('TC-SKILL-01: Verify all 6 technical skill categories and tags', async ({ portfolioPage }) => {
    const catCount = await portfolioPage.skills.getCategoryCount();
    expect(catCount).toBe(PORTFOLIO_DATA.skillsCategories.length);

    for (const cat of PORTFOLIO_DATA.skillsCategories) {
      const tags = await portfolioPage.skills.getTagsForCategory(cat.name);
      for (const expectedTag of cat.tags) {
        expect(tags).toContain(expectedTag);
      }
    }
  });

  test('TC-EXP-01: Verify default active experience tab is ValueLabs', async ({ portfolioPage }) => {
    const activeTab = await portfolioPage.experience.getActiveTabName();
    expect(activeTab).toBe('ValueLabs');

    const jobTitle = await portfolioPage.experience.getActiveJobTitle();
    expect(jobTitle).toBe(PORTFOLIO_DATA.experiences[0].title);

    const jobPeriod = await portfolioPage.experience.getActiveJobPeriod();
    expect(jobPeriod).toBe(PORTFOLIO_DATA.experiences[0].period);

    const bullets = await portfolioPage.experience.getActiveJobBullets();
    expect(bullets.length).toBeGreaterThanOrEqual(3);
  });

  test('TC-EXP-02: Switch tab to Endpoint Clinical and verify panel content', async ({ portfolioPage }) => {
    await portfolioPage.experience.selectTabByCompany('Endpoint Clinical');

    const activeTab = await portfolioPage.experience.getActiveTabName();
    expect(activeTab).toBe('Endpoint Clinical');

    const jobTitle = await portfolioPage.experience.getActiveJobTitle();
    expect(jobTitle).toBe(PORTFOLIO_DATA.experiences[1].title);

    const jobPeriod = await portfolioPage.experience.getActiveJobPeriod();
    expect(jobPeriod).toBe(PORTFOLIO_DATA.experiences[1].period);

    // Verify other panels are hidden
    await expect(portfolioPage.experience.getJobPanelById('valuelabs')).not.toBeVisible();
    await expect(portfolioPage.experience.getJobPanelById('ivy')).not.toBeVisible();
  });

  test('TC-EXP-03: Switch tab to Ivy Comptech and verify panel content', async ({ portfolioPage }) => {
    await portfolioPage.experience.selectTabByCompany('Ivy Comptech');

    const activeTab = await portfolioPage.experience.getActiveTabName();
    expect(activeTab).toBe('Ivy Comptech');

    const jobTitle = await portfolioPage.experience.getActiveJobTitle();
    expect(jobTitle).toBe(PORTFOLIO_DATA.experiences[2].title);

    const jobPeriod = await portfolioPage.experience.getActiveJobPeriod();
    expect(jobPeriod).toBe(PORTFOLIO_DATA.experiences[2].period);

    // Verify other panels are hidden
    await expect(portfolioPage.experience.getJobPanelById('valuelabs')).not.toBeVisible();
    await expect(portfolioPage.experience.getJobPanelById('endpoint')).not.toBeVisible();
  });

});
