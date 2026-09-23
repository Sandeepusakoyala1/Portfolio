import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeroSection extends BasePage {
  readonly heroSection: Locator;
  readonly statusPill: Locator;
  readonly liveDot: Locator;
  readonly headingName: Locator;
  readonly roleTitle: Locator;
  readonly description: Locator;
  readonly getInTouchBtn: Locator;
  readonly linkedInBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.heroSection = page.locator('section.hero');
    this.statusPill = page.locator('.status-pill');
    this.liveDot = page.locator('.live-dot');
    this.headingName = page.locator('.hero h1');
    this.roleTitle = page.locator('.hero-role');
    this.description = page.locator('.hero-desc');
    this.getInTouchBtn = page.locator('.hero-buttons a[href="#contact"]');
    this.linkedInBtn = page.locator('.hero-buttons a[href*="linkedin.com"]');
  }

  async getStatusText(): Promise<string> {
    return (await this.statusPill.innerText()).trim();
  }

  async getHeadingText(): Promise<string> {
    return (await this.headingName.innerText()).trim();
  }

  async getRoleText(): Promise<string> {
    return (await this.roleTitle.innerText()).trim();
  }

  async getDescriptionText(): Promise<string> {
    return (await this.description.innerText()).trim();
  }

  async clickGetInTouch(): Promise<void> {
    await this.getInTouchBtn.click();
  }

  async getLinkedInHref(): Promise<string | null> {
    return await this.linkedInBtn.getAttribute('href');
  }

  async getLinkedInTarget(): Promise<string | null> {
    return await this.linkedInBtn.getAttribute('target');
  }

  async getLinkedInRel(): Promise<string | null> {
    return await this.linkedInBtn.getAttribute('rel');
  }
}
