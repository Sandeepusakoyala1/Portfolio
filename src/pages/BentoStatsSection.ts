import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BentoStatsSection extends BasePage {
  readonly bentoSection: Locator;
  readonly bentoCards: Locator;
  readonly experienceCounter: Locator;

  constructor(page: Page) {
    super(page);
    this.bentoSection = page.locator('section.bento-row');
    this.bentoCards = page.locator('.bento-card');
    this.experienceCounter = page.locator('.bento-num.counter');
  }

  async getCardCount(): Promise<number> {
    return await this.bentoCards.count();
  }

  async getCardNumbers(): Promise<string[]> {
    return await this.bentoCards.locator('.bento-num').allInnerTexts();
  }

  async getCardLabels(): Promise<string[]> {
    return await this.bentoCards.locator('.bento-label').allInnerTexts();
  }

  async getCounterTarget(): Promise<string | null> {
    return await this.experienceCounter.getAttribute('data-target');
  }

  async getCurrentCounterValue(): Promise<string> {
    return (await this.experienceCounter.innerText()).trim();
  }
}
