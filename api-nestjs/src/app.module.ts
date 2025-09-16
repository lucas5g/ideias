import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhraseModule } from './phrase/phrase.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PhraseModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
