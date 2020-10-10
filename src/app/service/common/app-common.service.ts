import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppCommonService {
  baseUrlEmp = "http://localhost:5000/employee";
  constructor() {}
}
