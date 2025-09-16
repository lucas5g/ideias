import { prisma } from '@/utils/prisma'
import { CreatePhraseDto, UpdatePhraseDto } from "@/phrase/phrase.model"

export class PhraseService {
  async findAll() {
    return prisma.phrase.findMany()
  }

  async findOne(id: number) {
    return prisma.phrase.findUnique({ where: { id } })
  }

  async create(data: CreatePhraseDto) {
    return prisma.phrase.create({ data })
  }

  async update(id: number, data: UpdatePhraseDto) {
    return prisma.phrase.update({ where: { id }, data })
  }

  async delete(id: number) {
    await prisma.phrase.delete({ where: { id } })
    return true
  }
}
