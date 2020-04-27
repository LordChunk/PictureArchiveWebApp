import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    ) { }

  credentialsForm: FormGroup;
  user: Observable<any>;

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: [{ value: 'something@mail.com', disabled: false }],
      password: [{ value: 'sexyAnd@securePass12', disabled: false }],
    });

    this.user = this.authService.user;
  }

  login() {
    this.authService.login(
      this.credentialsForm.value['email'],
      this.credentialsForm.value['password'],
      );
  }

  register() {
    this.authService.register(
      this.credentialsForm.value['email'],
      this.credentialsForm.value['password'],
      );
  }

  logout() {
    this.authService.logout();
  }
}
