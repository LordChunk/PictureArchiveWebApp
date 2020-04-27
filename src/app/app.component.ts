import { Component } from '@angular/core';
import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Instantiate auth service
  constructor(private authService: AuthService) {

  }
}
