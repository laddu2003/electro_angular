import { Component } from "@angular/core";
import { ElectronService } from "./core/services";
import { TranslateService } from "@ngx-translate/core";
import { AppConfig } from "../environments/environment";
import { AppCookiesService } from "./service/cookies/app-cookies.service";
import { TokenStoreService } from "./service/token/token-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  token;
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    _token: TokenStoreService,
    private ipcRenderer: ElectronService
  ) {
    this.translate.setDefaultLang("en");
    this.token = _token.isLoggedIn();
    console.log(this.token);
    this.electronService.ipcRenderer.send("client-app-load", "client-app-load");
    this.electronService.ipcRenderer.on("version", (e, text) => {
      console.log("app version ", text);
    });
    this.electronService.ipcRenderer.on("message", (e, text) => {
      console.log("message ", text);
    });
    this.electronService.ipcRenderer.on("download-progress", (e, text) => {
      console.log("download-progress ", text);
    });
  }
}
