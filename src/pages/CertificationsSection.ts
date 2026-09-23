import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CertificationsSection extends BasePage {
  readonly certSection: Locator;
  readonly certCards: Locator;

  constructor(page: Page) {
    super(page);
    this.certSection = page.locator('section#certifications');
    this.certCards = page.locator('.cert-card');
  }

  async getCertificatesCount(): Promise<number> {
    return await this.certCards.count();
  }

  async getCertificateNames(): Promise<string[]> {
    return (await this.certCards.locator('.cert-name').allInnerTexts()).map(t => t.trim());
  }

  async getCertificateIssuers(): Promise<string[]> {
    return (await this.certCards.locator('.cert-org').allInnerTexts()).map(t => t.trim());
  }
}
