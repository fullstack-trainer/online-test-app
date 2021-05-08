import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getUser() {
    var user = localStorage.getItem("quizUser");
    if (user) {
      return JSON.parse(user);
    }
  }

  setUser(user: any) {
    localStorage.setItem("quizUser", JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem("quizUser");
  }
}
