import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':manga_name')
  searchController(@Param('manga_name') manga_name) {
    return this.searchService.getData(manga_name);
  }
}
