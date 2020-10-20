import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppCommonService } from "../common/app-common.service";

@Injectable({
  providedIn: "root",
})
export class AssignmentService {
  constructor(private _cS: AppCommonService, private _http: HttpClient) {}
  getAssignMent(url) {
    return this._http.post(`${this._cS.baseUrlEmp}/assignment/${url}`, {});
  }
  updateAssignmentWorkStatus(body) {
    return this._http.post(`${this._cS.baseUrlEmp}/assignment/update`, body);
  }
}
