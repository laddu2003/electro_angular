import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppCommonService } from "../common/app-common.service";

@Injectable({
  providedIn: "root",
})
export class AppAuthService {
  constructor(private _baseUrl: AppCommonService, private _http: HttpClient) {}
  send_login_request(url, body) {
    return this._http.post(`${this._baseUrl.baseUrlEmp}${url}`, body, {
      observe: "response",
    });
  }
}
