import { httpResource } from "@angular/common/http";
import { Component, computed } from "@angular/core";
import { Todo } from "../shared/todo";
import { z } from 'zod';
import { RouterLink } from "@angular/router";

const todoSchema = z.array(z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
}));

@Component({
  selector: 'app-todos',
  template: `
    @if (todos.error()) {
      <p>Something went wrong when loading todos...</p>
    }
    @else {
      @if (todos.isLoading()) {
        <p>Loading...</p>
      }
      @else {
        <ul>
          @for (todo of todos.value(); track todo.id) {
            <li>
              <a [routerLink]="['/todos', todo.id]">{{ todo.title }}</a>
            </li>
          }
        </ul>
        <p>Total Completed Todos: {{ completedCount() }}</p>
        <button (click)="todos.reload()">Reload</button>
      }
    }

    <hr>

    <ul>
      @for (todo of todosWithDefaultValue.value(); track todo.id) {
        <li>
          {{ todo.title }}
        </li>
      }
    </ul>

    <hr>

    <ul>
      @for (todo of todosWithSchemaValidation.value(); track todo.id) {
        <li>
          {{ todo.title }}
        </li>
      }
    </ul>

    <hr>

    <ul>
      @for (todo of todosTransformed.value(); track todo) {
        <li>
          {{ todo }}
        </li>
      }
    </ul>
  `,
  imports: [RouterLink],
})
export default class Todos {
  readonly todos = httpResource<Todo[]>(() => 'http://localhost:3000/api/todos');
  readonly completedCount = computed(() => this.todos.value()?.filter(todo => todo.completed).length);

  readonly todosWithDefaultValue = httpResource<Todo[]>(
    () => 'http://localhost:3000/api/todos',
    {
      defaultValue: [{ userId: 0, id: 0, title: 'Default Todo', completed: false }],
    }
  );

  readonly todosWithSchemaValidation = httpResource(
    () => 'http://localhost:3000/api/todos',
    {
      parse: todoSchema.parse,
    }
  );

  readonly todosTransformed = httpResource<string[]>(
    () => 'http://localhost:3000/api/todos',
    {
      parse: (todos) => (todos as Todo[]).map(todo => todo.title),
    }
  );
}