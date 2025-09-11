import { Injectable } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { prisma } from '@/utils/prisma';
import { elevenLabs } from '@/utils/eleven-labs';
import { TagService } from '@/tag/tag.service';
import { Prisma } from '@prisma/client';
import { env } from '@/utils/env';
import { gemini } from '@/utils/gemini';
import { FindAllPhraseDto } from './dto/find-all-phrase.dto';

@Injectable()
export class PhraseService {
  constructor(private readonly tagService: TagService) {}
  async upsert(dto: CreatePhraseDto) {
    const tag =
      (await this.tagService.findOneWhere({
        name: dto.tag,
      })) ??
      (await this.tagService.create({
        name: dto.tag,
      }));

    const english = await gemini(dto.portuguese);

    const data: Prisma.PhraseCreateInput = {
      portuguese: dto.portuguese,
      english,
      audio: await elevenLabs(english),
    };

    const phrase = await prisma.phrase.upsert({
      where: {
        portuguese: dto.portuguese,
      },
      update: data,
      create: data,
    });

    await prisma.phraseTag.upsert({
      where: {
        phraseId_tagId: {
          phraseId: phrase.id,
          tagId: tag.id,
        },
      },
      update: {},
      create: {
        phraseId: phrase.id,
        tagId: tag.id,
      },
    });

    return phrase;
  }

  async create(createPhraseDto: CreatePhraseDto) {
    const english =
      (await gemini(createPhraseDto.portuguese)) ?? 'no translation';

    return await prisma.phrase.create({
      data: {
        portuguese: createPhraseDto.portuguese,
        english,
        audio: await elevenLabs(english),
      },
      omit: {
        audio: true,
      },
    });
  }

  async findAll(dto?: FindAllPhraseDto) {
    const res = await prisma.phrase.findMany({
      where: {
        portuguese: {
          contains: dto?.portuguese,
        },
        english: {
          contains: dto?.english,
        },
        tags: {
          some: {
            tag: {
              name: dto?.tag,
            },
          },
        },
      },
      orderBy: {
        portuguese: 'asc',
      },
      select: {
        id: true,
        portuguese: true,
        english: true,
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const baseUrl = env.BASE_URL_API.includes('https')
      ? env.BASE_URL_API
      : env.BASE_URL_API.concat(':').concat(env.PORT.toString());

    return res.map((row) => {
      return {
        ...row,
        tags: row.tags.map((tag) => tag.tag.name),
        audio: `${baseUrl}/phrases/${row.id}/audio.mp3`,
      };
    });
  }

  findOne(id: number) {
    return prisma.phrase.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findOneWhere(where: Prisma.PhraseWhereUniqueInput) {
    return prisma.phrase.findUnique({
      where,
    });
  }

  update(id: number, updatePhraseDto: UpdatePhraseDto) {
    return prisma.phrase.update({
      where: {
        id,
      },
      data: updatePhraseDto,
    });
  }

  async remove(id: number) {
    await prisma.phraseTag.deleteMany({
      where: {
        phraseId: id,
      },
    });

    return prisma.phrase.delete({
      where: {
        id,
      },
    });
  }
}
