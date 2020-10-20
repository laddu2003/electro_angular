import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppCommonService } from "app/service/common/app-common.service";
import { BehaviorSubject, interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageSendService {
  private takeScreenShotSwitch = new BehaviorSubject<boolean>(false);
  takeScreenShotSwitchStatus = this.takeScreenShotSwitch.asObservable();
  constructor(private _http: HttpClient, private _common: AppCommonService) {}
  private _intervel = interval(1000);
  changeSwitchStatus(value: boolean) {
    this.takeScreenShotSwitch.next(value);
  }

  sendToServer(body) {
    return this._http.post(`${this._common.baseUrlEmp}/send-screenshot`, body);
  }
  fetchImages() {
    return this._http.post(`${this._common.baseUrlEmp}/get-screenshot`, {});
  }
  removeImage(body) {
    return this._http.post(
      `${this._common.baseUrlEmp}/remove-screenshot`,
      body
    );
  }
  timerModeInterval() {
    return this._intervel;
  }
}
