import {IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({example: 1, description: 'ID пользователя'})
  @IsInt()
  userId: number;

  @ApiProperty({example: 1, description: 'ID продукта'})
  @IsInt()
  productId: number;
}