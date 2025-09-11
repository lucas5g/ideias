import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { Response } from 'express';

@Controller('phrases')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @Post()
  create(@Body() createPhraseDto: CreatePhraseDto) {
    return this.phraseService.create(createPhraseDto);
  }

  @Get()
  findAll() {
    return this.phraseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phraseService.findOne(+id);
  }

  @Get(':id/audio.mp3')
  async findOneAudio(@Param('id') id: string, @Res() res: Response) {
    const { audio } = await this.phraseService.findOne(+id);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audio);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhraseDto: UpdatePhraseDto) {
    return this.phraseService.update(+id, updatePhraseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phraseService.remove(+id);
  }
}
