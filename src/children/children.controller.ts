/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Prisma } from 'generated/prisma/client';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.childrenService.findOne(+id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2025')
          throw new NotFoundException(`Child with id ${id} not found`);
      }
      throw e;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    try{
    return await this.childrenService.update(+id, updateChildDto);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2025')
          throw new NotFoundException(`Child with id ${id} not found`);
      }
      throw e;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
    return await this.childrenService.remove(+id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code == 'P2025')
          throw new NotFoundException(`Child with id ${id} not found`);
      }
      throw e;
    }
  }

  @Put(':childid/toys/:toyid')
  addToyToChild(
    @Param('childid') childid: string,
    @Param('toyid') toyid: string,
  ) {
    return this.childrenService.addToyToChild(+childid, +toyid);
  }

  @Delete(':childid/toys/:toyid')
  removeToyFromChild(
    @Param('childid') childid: string,
    @Param('toyid') toyid: string,
  ) {
    return this.childrenService.removeToyFromChild(+childid, +toyid);
  }
}
