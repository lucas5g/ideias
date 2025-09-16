import { prisma } from '@/utils/prisma';
import { CreatePhraseDto, UpdatePhraseDto, FindAllPhraseDto } from '@/phrase/phrase.model';

export class PhraseService {
  findAll(where?: FindAllPhraseDto) {
    return prisma.phrase.findMany({
      where:{
        OR: [
          { portuguese: { contains: where?.portuguese } },
          { english: { contains: where?.english } },
          // { tags: { hasSome: where?.tags ?? [] } },
        ]
      }
    });
  }

  findOne(id: number) {
    return prisma.phrase.findUnique({ where: { id } });
  }

  create(data: CreatePhraseDto) {
    return prisma.phrase.create({ data });
  }

  update(id: number, data: UpdatePhraseDto) {
    return prisma.phrase.update({ where: { id }, data });
  }

  delete(id: number) {
    return prisma.phrase.delete({ where: { id } });
  }
}
