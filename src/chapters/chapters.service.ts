import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ChaptersService {
  async getData(manga_url: string) {
    const url = decodeURIComponent(manga_url);

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLElement>('.chapters .tags a'),
      ).map((element) => {
        return {
          id: `${
            element.parentNode?.parentNode?.parentNode?.querySelector<HTMLElement>(
              'span',
            )?.textContent
          }`,
          chapter: `${encodeURIComponent(element.getAttribute('href') ?? '')}`,
        };
      });
    });

    browser.close();
    return result;
  }
}
