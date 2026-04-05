import {InputType, Field, Int} from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {@Field(() => Int, {description: 'ID задачи'})
id: number;

  @Field({nullable: true, description: 'новый текст задачи'})
  text?: string;

  @Field(() => Boolean, {nullable: true, description: 'новый статус выполнения'})
  completed?: boolean;

  @Field(() => Int, {nullable: true, description: 'ID пользователя'})
  userId?: number;
}