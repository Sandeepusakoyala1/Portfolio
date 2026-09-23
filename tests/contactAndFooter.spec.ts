import { test, expect } from '../src/fixtures/testFixtures';
import { PORTFOLIO_DATA } from '../src/utils/testData';

test.describe('Certifications & Footer Contact Suite', () => {

  test('TC-CERT-01: Verify all 6 certifications and their issuing organizations', async ({ portfolioPage }) => {
    const certCount = await portfolioPage.certifications.getCertificatesCount();
    expect(certCount).toBe(PORTFOLIO_DATA.certifications.length);

    const names = await portfolioPage.certifications.getCertificateNames();
    const orgs = await portfolioPage.certifications.getCertificateIssuers();

    PORTFOLIO_DATA.certifications.forEach((cert, idx) => {
      expect(names).toContain(cert.name);
      expect(orgs).toContain(cert.org);
    });
  });

  test('TC-CONT-01: Verify email contact link format and address', async ({ portfolioPage }) => {
    const emailHref = await portfolioPage.contact.getEmailHref();
    expect(emailHref).toBe(`mailto:${PORTFOLIO_DATA.contact.email}`);
  });

  test('TC-CONT-02: Verify phone contact link format and number', async ({ portfolioPage }) => {
    const phoneHref = await portfolioPage.contact.getPhoneHref();
    expect(phoneHref).toBe(`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`);
  });

  test('TC-CONT-03: Verify footer LinkedIn link and secure attributes', async ({ portfolioPage }) => {
    const linkedInHref = await portfolioPage.contact.getLinkedInHref();
    expect(linkedInHref).toBe(PORTFOLIO_DATA.contact.linkedInUrl);

    const target = await portfolioPage.contact.getLinkedInTarget();
    expect(target).toBe('_blank');

    const rel = await portfolioPage.contact.getLinkedInRel();
    // Test will catch missing rel="noopener noreferrer"
    expect(rel).toBe('noopener noreferrer');
  });

  test('TC-CONT-04: Verify copyright footer statement contains current year and title', async ({ portfolioPage }) => {
    const copyright = await portfolioPage.contact.getCopyrightText();
    expect(copyright).toContain('Sandeep Usakoyala');
    expect(copyright).toMatch(/202[0-9]/);
  });

});
