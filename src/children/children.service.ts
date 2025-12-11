/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private readonly db: PrismaService) {}

  create(createChildDto: CreateChildDto) {
    return this.db.gyerek.create({
      data: createChildDto,
    });
  }

  findAll() {
    return this.db.gyerek.findMany();
  }

  findOne(id: number) {
    return this.db.gyerek.findUniqueOrThrow({
      where: { id },
    });
  }

  async addToyToChild(childid: number, toyid: number) {
    const add  = await this.db.gyerek.update({
      where: { id: childid },
      data: {
        jatek: {
          connect: { id: toyid },
        },
      },
      include: { jatek: true },
    });
    if(!add){
      throw new Error(`Error putting toy to childerns wishlist`)
    }
    return add;
  }

  async removeToyFromChild(childid: number, toyid: number) {
    const remove = await this.db.gyerek.update({
      where: { id: childid },
      data: {
        jatek: {
          disconnect: { id: toyid },
        },
      },
    });
    if(!remove){
      throw new Error(`Error putting toy to childerns wishlist`)
    }
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.db.gyerek.update({
      where: { id },
      data: updateChildDto,
    });
  }

  remove(id: number) {
    return this.db.gyerek.delete({
      where: { id },
    });
  }
}
