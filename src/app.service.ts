import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(req: Request) {
    const url = `${req.protocol}://${req.get('Host')}${req.originalUrl}`
    return {
      manga_app_api: {
        routes: [
          `${url}search/5-toubun%20no%20Hanayome%20(Edi%C3%A7%C3%A3o%20Colorida)`,
          `${url}manga/https%3A%2F%2Fmangahost4.com%2Fmanga%2F5-toubun-no-hanayome-edicao-colorida-mh40574`,
          `${url}chapters/https%3A%2F%2Fmangahost4.com%2Fmanga%2F5-toubun-no-hanayome-edicao-colorida-mh40574`,
          `${url}chapter/https%3A%2F%2Fmangahost4.com%2Fmanga%2F5-toubun-no-hanayome-edicao-colorida-mh40574%2F67`,
        ],
      },
    };
  }
}
