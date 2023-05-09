import { Controller, Get, Param } from '@nestjs/common';
import { MangaService } from './manga.service';

@Controller('manga')
export class MangaController {
  constructor(private mangaService: MangaService) {}

  @Get(':manga_url')
  searchController(@Param('manga_url') manga_url) {
    return this.mangaService.getData(manga_url);
  }
}
