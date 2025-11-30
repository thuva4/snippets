import puppeteer, { Browser, Page } from 'puppeteer';

export class BrowserManager {
    private static instance: BrowserManager;
    private browser: Browser | null = null;

    private constructor() { }

    public static getInstance(): BrowserManager {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        return BrowserManager.instance;
    }

    public async getBrowser(): Promise<Browser> {
        if (!this.browser) {
            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
        }
        return this.browser;
    }

    public async newPage(): Promise<Page> {
        const browser = await this.getBrowser();
        return browser.newPage();
    }

    public async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}
