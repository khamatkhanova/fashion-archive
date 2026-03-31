import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from '../prisma.service';
import { TodosApiController } from './todos.api.controller';
import { TodosResolver } from './todos.resolver';

@Module({
  controllers: [TodosController, TodosApiController],
  providers: [TodosService, PrismaService, TodosResolver],
})
export class TodosModule {}
