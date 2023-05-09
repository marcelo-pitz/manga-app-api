import { Controller, Get, Param } from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller('chapter')
export class ChapterController {
  constructor(private chapterService: ChapterService) {}

  @Get(':manga_url')
  searchController(@Param('manga_url') manga_url) {
    return this.chapterService.getData(manga_url);
  }
}
