import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { MangaModule } from './manga/manga.module';
import { ChaptersModule } from './chapters/chapters.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [ SearchModule, MangaModule, ChaptersModule, ChapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
