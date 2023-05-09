import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class MangaService {
  async getData(manga_url: string) {
    const url = decodeURIComponent(manga_url);

    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto(url);

    const result = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll<HTMLElement>('.box-content.box-perfil'),
      ).map((element) => {
        return {
          name: `${
            element.querySelector<HTMLElement>('article .title')?.textContent
          }`,
          originalName: `${element
            .querySelector<HTMLElement>('article .subtitle')
            ?.innerHTML.replace(
              '<strong class="btn-caps btn-in-text">Ativo</strong>',
              '',
            )}`,
          situation: `${
            element.querySelector<HTMLElement>('article .subtitle strong')
              ?.textContent
          }`,
          tags: Array.from(document.querySelectorAll<HTMLElement>('a.tag')).map(
            (el) => el.textContent,
          ),
          synopsis: `${
            element.querySelector<HTMLElement>('.paragraph p')?.textContent
          }`,
          img: `${element
            .querySelector<HTMLElement>('picture img')
            ?.getAttribute('src')}`,
          url: window.location.href,
        };
      });
    });

    browser.close();
    return result;
  }
}
