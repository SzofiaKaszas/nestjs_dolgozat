/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private readonly db : PrismaService){}
  create(createToyDto: CreateToyDto) {
    return this.db.jatek.create({
      data: {
        name: createToyDto.name,
        anyag: createToyDto.material,
        suly: createToyDto.weight
      },
    });
  }

  findAll() {
    return this.db.jatek.findMany();
  }

  findOne(id: number) {
    return this.db.jatek.findUnique({
      where: {id},
    });
  }

  update(id: number, updateToyDto: UpdateToyDto) {
    return this.db.jatek.update({
      where: {id},
      data: {
        name: updateToyDto.name,
        anyag: updateToyDto.material,
        suly: updateToyDto.weight
      },
    });
  }

  remove(id: number) {
    return this.db.jatek.delete({
      where: {id},
    });
  }
}
