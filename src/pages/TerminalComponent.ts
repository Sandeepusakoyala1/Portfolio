import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TerminalComponent extends BasePage {
  readonly terminalBox: Locator;
  readonly terminalBar: Locator;
  readonly runBtn: Locator;
  readonly testConsole: Locator;
  readonly dots: Locator;

  constructor(page: Page) {
    super(page);
    this.terminalBox = page.locator('.terminal-box');
    this.terminalBar = page.locator('.terminal-bar');
    this.runBtn = page.locator('#run-test-trigger');
    this.testConsole = page.locator('#test-console');
    this.dots = page.locator('.terminal-dots .tdot');
  }

  async getButtonText(): Promise<string> {
    return (await this.runBtn.innerText()).trim();
  }

  async isButtonDisabled(): Promise<boolean> {
    return await this.runBtn.isDisabled();
  }

  async clickRunTestSuite(): Promise<void> {
    await this.runBtn.click();
  }

  async getConsoleText(): Promise<string> {
    return (await this.testConsole.innerText()).trim();
  }

  async waitForExecutionToComplete(timeoutMs: number = 5000): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const btn = document.getElementById('run-test-trigger') as HTMLButtonElement | null;
        return btn && !btn.disabled && btn.innerText.includes('Run Again');
      },
      { timeout: timeoutMs }
    );
  }
}
