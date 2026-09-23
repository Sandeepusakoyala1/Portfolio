import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationBar extends BasePage {
  readonly header: Locator;
  readonly brandLink: Locator;
  readonly brandMark: Locator;
  readonly navLinksList: Locator;
  readonly navLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('header');
    this.brandLink = page.locator('nav a.brand');
    this.brandMark = page.locator('nav .brand-mark');
    this.navLinksList = page.locator('nav ul.nav-links');
    this.navLinks = page.locator('nav ul.nav-links a');
  }

  async getBrandText(): Promise<string> {
    return (await this.brandLink.innerText()).trim();
  }

  async getBrandMarkText(): Promise<string> {
    return (await this.brandMark.innerText()).trim();
  }

  async clickBrandLink(): Promise<void> {
    await this.brandLink.click();
  }

  async getNavLinkLabels(): Promise<string[]> {
    return await this.navLinks.allInnerTexts();
  }

  getNavLink(label: string): Locator {
    return this.page.locator(`nav ul.nav-links a:has-text("${label}")`);
  }

  async clickNavLink(label: string): Promise<void> {
    await this.getNavLink(label).click();
  }

  async areNavLinksVisible(): Promise<boolean> {
    return await this.navLinksList.isVisible();
  }
}
