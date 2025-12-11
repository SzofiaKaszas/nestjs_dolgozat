/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { Prisma } from 'generated/prisma/client';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
    return await this.toysService.findOne(+id);
    }
    catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if(e.code == "P2025")
        throw new NotFoundException(`Toy with id ${id} not found`);
      }
      throw e;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    try {
      return await this.toysService.update(+id, updateToyDto);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if(e.code == "P2025")
        throw new NotFoundException(`Toy with id ${id} not found`);
      }
      throw e;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try{
    return await this.toysService.remove(+id);
    }
    catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if(e.code == "P2025")
        throw new NotFoundException(`Toy with id ${id} not found`);
      }
      throw e;
    }
  }
}
