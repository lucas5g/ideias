import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { prisma } from '@/utils/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  create(createTagDto: CreateTagDto) {
    return prisma.tag.create({
      data: {
        name: createTagDto.name,
      },
    });
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return prisma.tag.update({
      where: {
        id,
      },
      data: updateTagDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  findOneWhere(where: Prisma.TagWhereUniqueInput) {
    return prisma.tag.findUnique({
      where,
    });
  }
}
