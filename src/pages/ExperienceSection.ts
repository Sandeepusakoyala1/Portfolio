import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExperienceSection extends BasePage {
  readonly experienceSection: Locator;
  readonly tabButtons: Locator;
  readonly activeTabButton: Locator;
  readonly jobPanels: Locator;
  readonly activeJobPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.experienceSection = page.locator('section#experience');
    this.tabButtons = page.locator('.company-btn');
    this.activeTabButton = page.locator('.company-btn.active');
    this.jobPanels = page.locator('.job-panel');
    this.activeJobPanel = page.locator('.job-panel.active');
  }

  async getTabNames(): Promise<string[]> {
    return (await this.tabButtons.allInnerTexts()).map(t => t.trim());
  }

  async getActiveTabName(): Promise<string> {
    return (await this.activeTabButton.innerText()).trim();
  }

  async selectTabByCompany(companyName: string): Promise<void> {
    await this.tabButtons.filter({ hasText: companyName }).click();
  }

  async getActiveJobTitle(): Promise<string> {
    return (await this.activeJobPanel.locator('.job-title').innerText()).trim();
  }

  async getActiveJobPeriod(): Promise<string> {
    return (await this.activeJobPanel.locator('.job-period').innerText()).trim();
  }

  async getActiveJobBullets(): Promise<string[]> {
    return (await this.activeJobPanel.locator('.job-bullets li').allInnerTexts()).map(b => b.trim());
  }

  getJobPanelById(id: string): Locator {
    return this.page.locator(`.job-panel#${id}`);
  }
}
