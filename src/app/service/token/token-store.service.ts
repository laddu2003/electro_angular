import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  private iss = {
    login: "http://localhost:5000/employee/login",
  };
  constructor() {}

  handle(token: any) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();

    if (token) {
      const payload = this.getPayload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  getPayload(token) {
    const payload = token.split('.')[1];
    return this.deCodePayload(payload);
  }

  deCodePayload(token) {
    return JSON.parse(atob(token));
  }
  isLoggedIn() {
    return this.isValid();
  }

}
