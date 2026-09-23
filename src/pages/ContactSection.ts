import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactSection extends BasePage {
  readonly footerSection: Locator;
  readonly heading: Locator;
  readonly emailLink: Locator;
  readonly phoneLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyright: Locator;

  constructor(page: Page) {
    super(page);
    this.footerSection = page.locator('footer#contact');
    this.heading = page.locator('footer#contact h2');
    this.emailLink = page.locator('footer .contact-row a[href^="mailto:"]');
    this.phoneLink = page.locator('footer .contact-row a[href^="tel:"]');
    this.linkedInLink = page.locator('footer .contact-row a[href*="linkedin.com"]');
    this.copyright = page.locator('footer .copyright');
  }

  async getEmailHref(): Promise<string | null> {
    return await this.emailLink.getAttribute('href');
  }

  async getPhoneHref(): Promise<string | null> {
    return await this.phoneLink.getAttribute('href');
  }

  async getLinkedInHref(): Promise<string | null> {
    return await this.linkedInLink.getAttribute('href');
  }

  async getLinkedInTarget(): Promise<string | null> {
    return await this.linkedInLink.getAttribute('target');
  }

  async getLinkedInRel(): Promise<string | null> {
    return await this.linkedInLink.getAttribute('rel');
  }

  async getCopyrightText(): Promise<string> {
    return (await this.copyright.innerText()).trim();
  }
}
