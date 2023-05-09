import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ChapterService {
  async getData(manga_url: string) {
    const url = decodeURIComponent(manga_url);

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLImageElement>('.image-content img'),
      ).map((element) => {
        return {
          id: `${element.getAttribute('id')}`,
          image: `${element.getAttribute('src')}`,
          naturalWidth: `${element.naturalWidth}`,
          naturalHeight: `${element.naturalHeight}`,
        };
      });
    });

    browser.close();
    return result;
  }
}
