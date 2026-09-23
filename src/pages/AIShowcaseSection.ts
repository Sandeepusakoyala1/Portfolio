import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AIShowcaseSection extends BasePage {
  readonly aiSection: Locator;
  readonly aiPill: Locator;
  readonly heading: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.aiSection = page.locator('section#ai-innovations');
    this.aiPill = page.locator('.ai-pill');
    this.heading = page.locator('#ai-innovations h3');
    this.cards = page.locator('.ai-card');
  }

  async getCardCount(): Promise<number> {
    return await this.cards.count();
  }

  async getCardTitles(): Promise<string[]> {
    return (await this.cards.locator('h4').allInnerTexts()).map(t => t.trim());
  }

  async getCardDescriptions(): Promise<string[]> {
    return (await this.cards.locator('p').allInnerTexts()).map(p => p.trim());
  }
}
