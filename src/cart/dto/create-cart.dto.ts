import {IsInt, IsOptional, Min} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({description: 'ID пользователя', example: 1})
  @IsInt()
  userId: number;

  @ApiProperty({description: 'ID продукта', example: 1})
  @IsInt()
  productId: number;

  @ApiPropertyOptional({description: 'количество товара', example: 1, minimum: 1})
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}