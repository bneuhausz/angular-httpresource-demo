import { httpResource } from "@angular/common/http";
import { Component, input, signal } from "@angular/core";
import { Todo } from "../shared/todo";

@Component({
  selector: 'app-todo',
  template: `
    <p>Todo Details for ID: {{ id() }}</p>
    <p>Todo Title: {{ todo.value()?.title }}</p>

    <hr>

    <button (click)="changeId()">Change ID</button>
    <p>Todo Details for changing ID: {{ changingId() }}</p>
    <p>Todo Title: {{ changingTodo.value()?.title }}</p>

    <hr>

    <p>Post Todo Details for ID: {{ id() }}</p>
    <p>Todo Title: {{ postTodo.value()?.title }}</p>
  `
})
export default class TodoDetails {
  readonly id = input.required<number>();
  readonly todo = httpResource<Todo>(() => `http://localhost:3000/api/todos/${this.id()}`)

  readonly changingId = signal<number>(1);
  readonly changingTodo = httpResource<Todo>(() => `http://localhost:3000/api/todos/${this.changingId()}`);

  changeId() {
    const randomId = Math.floor(Math.random() * 5) + 1;
    this.changingId.set(randomId);
  }

  readonly postTodo = httpResource<Todo>(() => {
    const todoId = this.id();

    return {
      method: 'POST',
      url: `http://localhost:3000/api/todos`,
      body: { id: todoId }
    };
  });
}