import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SkillsSection extends BasePage {
  readonly skillsSection: Locator;
  readonly skillCards: Locator;

  constructor(page: Page) {
    super(page);
    this.skillsSection = page.locator('section#skills');
    this.skillCards = page.locator('.skill-card');
  }

  async getCategoryCount(): Promise<number> {
    return await this.skillCards.count();
  }

  async getCategoryTitles(): Promise<string[]> {
    return (await this.skillCards.locator('.skill-title').allInnerTexts()).map(t => t.trim());
  }

  async getTagsForCategory(categoryName: string): Promise<string[]> {
    const card = this.skillCards.filter({ hasText: categoryName });
    return (await card.locator('.tag').allInnerTexts()).map(t => t.trim());
  }

  async getAllFeaturedTags(): Promise<string[]> {
    return (await this.page.locator('.tag.tag-featured').allInnerTexts()).map(t => t.trim());
  }
}
