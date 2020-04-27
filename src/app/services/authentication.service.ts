import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, from, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';
import { distinctUntilChanged, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: ReplaySubject<User> = new ReplaySubject(1);
  get user(): Observable<User> {
    return this._user.pipe(distinctUntilChanged());
  }

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        const publicUser: User = {
          email: user.email,
          uid: user.uid,
        };

        this._user.next(publicUser);
      } else {
        this._user.next(null);
      }
    });
  }

  public login(email: string, password: string) {
    const user = from(this.auth.signInWithEmailAndPassword(email, password));

    user.subscribe((userCred) => {
      this._user.next(userCred.user);
    });
  }

  public register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  public logout() {
    this.auth.signOut();
  }

  isLoggedIn() {
    return this.auth.authState.pipe(first()).toPromise();
  }
}
