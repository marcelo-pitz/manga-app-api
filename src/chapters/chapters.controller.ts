import { Controller, Get, Param } from '@nestjs/common';
import { ChaptersService } from './chapters.service';

@Controller('chapters')
export class ChaptersController {
  constructor(private chaptersService: ChaptersService) {}

  @Get(':manga_url')
  searchController(@Param('manga_url') manga_url) {
    return this.chaptersService.getData(manga_url);
  }
}
