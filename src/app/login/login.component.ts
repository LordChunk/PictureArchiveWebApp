import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    ) { }

  credentialsForm: FormGroup;

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: [{ value: 'something@mail.com', disabled: this.authService.isLoggedIn() }],
      password: [{ value: 'sexyAnd@securePass12', disabled: this.authService.isLoggedIn() }],
    });
  }

  login() {
    this.authService.login(
      this.credentialsForm.value['email'],
      this.credentialsForm.value['password'],
      );

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  register() {
    this.authService.register(
      this.credentialsForm.value['email'],
      this.credentialsForm.value['password'],
      );

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/']);
  }
}
