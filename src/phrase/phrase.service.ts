import { Injectable } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { prisma } from '@/utils/prisma';
import { elevenLabs } from '@/utils/eleven-labs';
import { TagService } from '@/tag/tag.service';
import { Phrase, Prisma, Tag } from '@prisma/client';
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

    return this.response(phrase);
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
    const select = {
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
    };

    if (dto?.search) {
      const res = await prisma.phrase.findMany({
        where: {
          OR: [
            {
              portuguese: {
                contains: dto.search,
              },
            },
            {
              english: {
                contains: dto.search,
              },
            },
            {
              tags: {
                some: {
                  tag: {
                    name: dto.search,
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          portuguese: 'asc',
        },
        select,
      });

      return res.map((row) => this.response(row));
    }

    const res = await prisma.phrase.findMany({
      where: {
        portuguese: {
          contains: dto?.portuguese,
          mode: 'insensitive',
        },
        english: {
          contains: dto?.english,
          mode: 'insensitive',
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
      select,
    });

    return res.map((row) => this.response(row));
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

  private response(
    phrase: Pick<Phrase, 'id' | 'portuguese' | 'english'> & {
      tags?: { tag: Pick<Tag, 'name'> }[];
    },
  ) {
    return {
      id: phrase.id,
      portuguese: phrase.portuguese,
      english: phrase.english,
      tags: phrase.tags?.map((row) => row.tag.name),
      audio: `${env.BASE_URL_API}/phrases/${phrase.id}/audio.mp3`,
    };
  }
}
