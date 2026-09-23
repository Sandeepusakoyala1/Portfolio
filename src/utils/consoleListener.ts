import { Page } from '@playwright/test';

export interface ConsoleIssue {
  type: string;
  text: string;
  location?: string;
}

export class ConsoleListener {
  private errors: ConsoleIssue[] = [];
  private warnings: ConsoleIssue[] = [];
  private failedRequests: { url: string; status?: number; error?: string }[] = [];

  constructor(private page: Page) {
    this.attachListeners();
  }

  private attachListeners() {
    this.page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      const location = msg.location() ? `${msg.location().url}:${msg.location().lineNumber}` : undefined;

      if (type === 'error') {
        this.errors.push({ type, text, location });
      } else if (type === 'warning') {
        this.warnings.push({ type, text, location });
      }
    });

    this.page.on('pageerror', error => {
      this.errors.push({
        type: 'uncaught-exception',
        text: error.message,
        location: error.stack
      });
    });

    this.page.on('requestfailed', request => {
      this.failedRequests.push({
        url: request.url(),
        error: request.failure()?.errorText
      });
    });

    this.page.on('response', response => {
      if (response.status() >= 400) {
        this.failedRequests.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
  }

  getErrors() {
    return this.errors;
  }

  getWarnings() {
    return this.warnings;
  }

  getFailedRequests() {
    return this.failedRequests;
  }

  clear() {
    this.errors = [];
    this.warnings = [];
    this.failedRequests = [];
  }
}
