import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from './NavigationBar';
import { HeroSection } from './HeroSection';
import { TerminalComponent } from './TerminalComponent';
import { BentoStatsSection } from './BentoStatsSection';
import { AIShowcaseSection } from './AIShowcaseSection';
import { SkillsSection } from './SkillsSection';
import { ExperienceSection } from './ExperienceSection';
import { CertificationsSection } from './CertificationsSection';
import { ContactSection } from './ContactSection';
import { HireModalComponent } from './HireModalComponent';

export class PortfolioPage extends BasePage {
  readonly navBar: NavigationBar;
  readonly hero: HeroSection;
  readonly terminal: TerminalComponent;
  readonly bentoStats: BentoStatsSection;
  readonly aiShowcase: AIShowcaseSection;
  readonly skills: SkillsSection;
  readonly experience: ExperienceSection;
  readonly certifications: CertificationsSection;
  readonly contact: ContactSection;
  readonly hireModal: HireModalComponent;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavigationBar(page);
    this.hero = new HeroSection(page);
    this.terminal = new TerminalComponent(page);
    this.bentoStats = new BentoStatsSection(page);
    this.aiShowcase = new AIShowcaseSection(page);
    this.skills = new SkillsSection(page);
    this.experience = new ExperienceSection(page);
    this.certifications = new CertificationsSection(page);
    this.contact = new ContactSection(page);
    this.hireModal = new HireModalComponent(page);
  }

  async loadPortfolio(): Promise<void> {
    await this.navigate('');
    // Wait for the main elements to load
    await this.navBar.header.waitFor({ state: 'visible' });
    await this.hero.headingName.waitFor({ state: 'visible' });
  }

  async is3DCanvasPresent(): Promise<boolean> {
    const canvas = this.page.locator('#webgl-canvas canvas');
    return (await canvas.count()) > 0;
  }
}
