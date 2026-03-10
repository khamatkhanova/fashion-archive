export class CreateTodoDto {
  userId: number;
  text: string;
  completed?: boolean;
}