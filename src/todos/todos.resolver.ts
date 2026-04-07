import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {TodosService} from './todos.service';
import {TodoObject} from './dto/todo.object';
import {CreateTodoInput} from './dto/create-todo.input';
import {UpdateTodoInput} from './dto/update-todo.input';

@Resolver(() => TodoObject)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [TodoObject], { name: 'todos' })
  getTodos(@Args('page', {type: () => Int, nullable: true}) page = 1, @Args('limit', {type: () => Int, nullable: true}) limit = 10,) {
    return this.todosService.findPaginated(page, limit);
  }

  @Query(() => TodoObject, {name: 'todo'})
  getTodo(@Args('id', {type: () => Int }) id: number) {
    return this.todosService.findOne(id);
  }

  @Mutation(() => TodoObject)
  createTodo(@Args('data') data: CreateTodoInput) {
    return this.todosService.create(data);
  }

  @Mutation(() => TodoObject)
  updateTodo(@Args('data') data: UpdateTodoInput) {
    return this.todosService.update(data.id, data);
  }

  @Mutation(() => TodoObject)
  removeTodo(@Args('id', {type: () => Int}) id: number) {
    return this.todosService.remove(id);
  }
}