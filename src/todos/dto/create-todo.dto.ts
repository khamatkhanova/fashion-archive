import {IsInt, IsString, IsOptional, IsBoolean} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({example: 1, description: 'ID пользователя'})
  @IsInt()
  userId: number;

  @ApiProperty({description: 'текст задачи', example: 'купить балетки'})
  @IsString()
  text: string;

  @ApiProperty({description: 'статус выполнения', example: false, required: false})
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}