import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppCookiesService {
  private iss = {
    login: "http://localhost:5000/employee/login",
  };
  constructor() {}
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=http://localhost:5000/emoloyee/login";
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  eraseCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  deCodePayload(token) {
    return JSON.parse(atob(token));
  }
  getPayload(token) {
    const payload = token.split(".")[1];
    return this.deCodePayload(payload);
  }
  isValid() {
    const token = this.getCookie("_token");

    if (token) {
      const payload = this.getPayload(token);

      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }
  isLoggedIn() {
    return this.isValid();
  }
}
