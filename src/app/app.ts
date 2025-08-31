import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <a routerLink="/todos">Todos</a>

    <router-outlet />
  `,
  styles: [],
})
export class App { }
