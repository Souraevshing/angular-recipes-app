import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  //commented since this block of code is redundant
  //currentComponent: string = 'recipe';

  // handleNavigate(path: string): void {
  //   this.currentComponent = path;
  // }

  //login the user automatically if exists
  ngOnInit(): void {
    this.authService.loginAutomatically();
  }
}
