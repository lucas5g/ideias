import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrase.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { plainToInstance } from 'class-transformer';
import { TagService } from '@/tag/tag.service';
import { env } from '@/utils/env';

describe('PhraseService', () => {
  let service: PhraseService;
  const id = 1;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhraseService, TagService],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it('upsert', async () => {
    const payload: CreatePhraseDto = {
      portuguese: 'bom dia.',
      tag: 'test2',
    };

    const dto = plainToInstance(CreatePhraseDto, payload);

    const res = await service.upsert(dto);

    expect(res).toMatchObject({
      portuguese: dto.portuguese,
    });
  });

  it('findAll', async () => {
    const res = await service.findAll();

    for (const row of res) {
      expect(row.audio).toContain(env.BASE_URL_API);
    }

    expect(res).toBeInstanceOf(Array);
  });

  it.only('findAll portuguese=bom dia', async () => {
    const portuguese = 'bom di';
    const res = await service.findAll({ portuguese });

    expect(
      res.every((phrase) => phrase.portuguese.includes(portuguese)),
    ).toBeTruthy();
  });

  it('findAll tag=test2', async () => {
    const tag = 'test2';
    const res = await service.findAll({ tag });

    expect(
      res.every((phrase) => phrase.tags.some((row) => row === tag)),
    ).toBeTruthy();
  });

  it('findOne', async () => {
    const res = await service.findOne(id);

    expect(res).toBeInstanceOf(Object);
  });
});
