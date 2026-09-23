import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HireModalComponent extends BasePage {
  readonly modalBackdrop: Locator;
  readonly modalBox: Locator;
  readonly closeBtn: Locator;
  readonly hireButtons: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly roleSelect: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;
  readonly copySummaryBtn: Locator;
  readonly successBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.modalBackdrop = page.locator('#hire-modal');
    this.modalBox = page.locator('#hire-modal .modal-box');
    this.closeBtn = page.locator('#modal-close');
    this.hireButtons = page.locator('.hire-me-trigger');
    this.nameInput = page.locator('#inquiry-name');
    this.emailInput = page.locator('#inquiry-email');
    this.companyInput = page.locator('#inquiry-company');
    this.roleSelect = page.locator('#inquiry-role');
    this.messageInput = page.locator('#inquiry-message');
    this.submitBtn = page.locator('#inquiry-submit');
    this.copySummaryBtn = page.locator('#inquiry-copy-summary');
    this.successBanner = page.locator('#form-success');
  }

  async openModal(): Promise<void> {
    await this.hireButtons.first().click();
    await this.modalBackdrop.waitFor({ state: 'visible' });
  }

  async closeModal(): Promise<void> {
    await this.closeBtn.click();
    await this.modalBackdrop.waitFor({ state: 'hidden' });
  }

  async closeViaBackdrop(): Promise<void> {
    await this.modalBackdrop.click({ position: { x: 10, y: 10 }, force: true });
    await this.modalBackdrop.waitFor({ state: 'hidden' });
  }

  async closeViaEscape(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.modalBackdrop.waitFor({ state: 'hidden' });
  }

  async isModalVisible(): Promise<boolean> {
    return await this.modalBackdrop.isVisible();
  }

  async fillInquiryForm(details: {
    name: string;
    email: string;
    company?: string;
    role?: string;
    message?: string;
  }): Promise<void> {
    await this.nameInput.fill(details.name);
    await this.emailInput.fill(details.email);
    if (details.company) await this.companyInput.fill(details.company);
    if (details.role) await this.roleSelect.selectOption({ label: details.role });
    if (details.message) await this.messageInput.fill(details.message);
  }

  async submitInquiry(): Promise<void> {
    await this.submitBtn.click();
  }
}
