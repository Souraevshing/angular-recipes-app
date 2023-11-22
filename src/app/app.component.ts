import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentComponent: string = 'recipe';

  handleNavigate(path: string): void {
    this.currentComponent = path;
  }
}
