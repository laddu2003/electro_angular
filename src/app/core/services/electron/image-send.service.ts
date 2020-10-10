import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppCommonService } from "app/service/common/app-common.service";

@Injectable({
  providedIn: "root",
})
export class ImageSendService {
  constructor(private _http: HttpClient, private _common: AppCommonService) {}

  sendToServer(body) {
    return this._http.post(`${this._common.baseUrlEmp}/send-screenshot`, body);
  }
}
