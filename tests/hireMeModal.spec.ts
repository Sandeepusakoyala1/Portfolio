import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Hire Me / Recruiter Hub Modal Suite', () => {

  test('TC-HIRE-01: Clicking desktop Hire Me button opens the Recruiter Hub modal', async ({ portfolioPage }) => {
    const hireBtn = portfolioPage.page.locator('#hire-me-btn');
    await expect(hireBtn).toBeVisible();

    await hireBtn.click();
    await expect(portfolioPage.hireModal.modalBackdrop).toBeVisible();
    await expect(portfolioPage.hireModal.modalBox).toBeVisible();

    // Verify modal heading and subtitle
    const title = await portfolioPage.hireModal.modalBox.locator('#hire-modal-title').innerText();
    expect(title).toContain('Build Reliable Software');
  });

  test('TC-HIRE-02: Verify direct recruiter channels and copy actions inside modal', async ({ portfolioPage }) => {
    await portfolioPage.hireModal.openModal();

    const emailText = await portfolioPage.hireModal.modalBox.locator('.channel-val:has-text("@gmail.com")').innerText();
    expect(emailText).toContain('Sandeep.usakoyala01@gmail.com');

    const phoneText = await portfolioPage.hireModal.modalBox.locator('.channel-val:has-text("+91")').innerText();
    expect(phoneText).toContain('+91 9908489215');

    // Click copy email button
    const copyEmailBtn = portfolioPage.hireModal.modalBox.locator('button[data-copy="Sandeep.usakoyala01@gmail.com"]');
    await expect(copyEmailBtn).toBeVisible();
    await copyEmailBtn.click();

    // Verify toast notification appears
    const toast = portfolioPage.page.locator('#toast');
    await expect(toast).toHaveClass(/show/);
    await expect(toast).toContainText('Copied to clipboard');
  });

  test('TC-HIRE-03: Fill and submit direct inquiry form', async ({ portfolioPage }) => {
    await portfolioPage.hireModal.openModal();

    await portfolioPage.hireModal.fillInquiryForm({
      name: 'Elena Rostova',
      email: 'elena@enterprise-tech.com',
      company: 'HealthSync Inc.',
      role: 'Senior SDET (Playwright / TypeScript)',
      message: 'Looking for a Senior SDET to lead our Playwright and clinical trial testing framework.'
    });

    await portfolioPage.hireModal.submitInquiry();

    // Verify success confirmation banner is displayed
    await expect(portfolioPage.hireModal.successBanner).toBeVisible();
    const successText = await portfolioPage.hireModal.successBanner.innerText();
    expect(successText).toContain('Inquiry Prepared & Copied!');
  });

  test('TC-HIRE-04: Verify closing modal via close button, backdrop click, and Escape key', async ({ portfolioPage }) => {
    // 1. Close via close button
    await portfolioPage.hireModal.openModal();
    await portfolioPage.hireModal.closeModal();
    await expect(portfolioPage.hireModal.modalBackdrop).not.toBeVisible();

    // 2. Close via Escape key
    await portfolioPage.hireModal.openModal();
    await portfolioPage.hireModal.closeViaEscape();
    await expect(portfolioPage.hireModal.modalBackdrop).not.toBeVisible();

    // 3. Close via backdrop click
    await portfolioPage.hireModal.openModal();
    await portfolioPage.hireModal.closeViaBackdrop();
    await expect(portfolioPage.hireModal.modalBackdrop).not.toBeVisible();
  });

  test('TC-HIRE-05: Mobile viewport drawer Hire Me button opens modal and closes drawer', async ({ portfolioPage }) => {
    await portfolioPage.page.setViewportSize({ width: 390, height: 844 });

    // Open mobile hamburger menu
    const mobileToggle = portfolioPage.page.locator('#mobile-toggle');
    await mobileToggle.click();

    const mobileDrawer = portfolioPage.page.locator('#mobile-drawer');
    await expect(mobileDrawer).toBeVisible();

    // Click mobile Hire Me button
    const mobileHireBtn = mobileDrawer.locator('button.hire-me-trigger');
    await mobileHireBtn.click();

    // Modal should be open
    await expect(portfolioPage.hireModal.modalBackdrop).toBeVisible();

    // Mobile drawer should be auto-closed
    await expect(mobileDrawer).not.toHaveClass(/open/);
  });

});
