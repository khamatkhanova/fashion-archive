import {ApiProperty}  from '@nestjs/swagger';

export class TodoResponseDto {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: 1})
  userId: number;

  @ApiProperty({example: 'купить балетки'})
  text: string;

  @ApiProperty({example: false})
  completed: boolean;

  @ApiProperty({example: '2026-03-25T10:57:04.367Z'})
  createdAt: Date;
}
