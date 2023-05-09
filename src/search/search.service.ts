import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class SearchService {
  async getData(manga_name: string) {
    const url = `https://mangahost4.com/find/${manga_name}`;

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('.box-content.box-perfil table tbody tr'),
      ).map((element) => {
        return {
          title: `${
            element.querySelector<HTMLElement>('h4.entry-title')?.innerText
          }`,
          image: `${element
            .querySelector<HTMLElement>('img.manga')
            ?.getAttribute('src')}`,
          resume: `${
            element.querySelector<HTMLElement>('div.entry-content')?.innerText
          }`,
          link_manga: `${encodeURIComponent(
            element
              .querySelector<HTMLElement>('h4.entry-title a')
              ?.getAttribute('href') ?? '',
          )}`,
        };
      });
    });

    browser.close();
    return result;
  }
}
