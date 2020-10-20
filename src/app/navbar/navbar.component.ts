import { Component, OnInit } from "@angular/core";
import { ElectronService } from "app/core/services";
import { ImageSendService } from "app/core/services/electron/image-send.service";
import { AppAuthService } from "app/service/auth/app-auth.service";
import { SnackbarService } from "app/service/snackbar/snackbar.service";
import { TokenStoreService } from "app/service/token/token-store.service";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  electrondilog;
  constructor(
    private ipcRenderer: ElectronService,
    private _ssService: ImageSendService,
    private _electronServices: ElectronService,
    private _authService: AppAuthService,
    private _tokenStoreService: TokenStoreService,
    private _sbService: SnackbarService
  ) {
    this.electrondilog = window.require("electron").remote.dialog;
  }

  isChecked = false;
  interval = interval(15 * 60 * 1000);
  watchmod;
  watchMeSubscrition: Subscription;
  ngOnInit(): void {
    console.log("call update");

    this._electronServices.ipcRenderer.send("app_lod_dashboard");
  }

  watchMode(event) {
    this.isChecked = event.checked;
    if (this.isChecked == true) {
      window.alert("watch mode is on");
      this.watchMeSubscrition = this.interval.subscribe((res) => {
        this._electronServices.takeScreenShot();
      });
    } else {
      window.alert("watch mode is off");
      this.watchMeSubscrition.unsubscribe();
    }
  }

  miniMize() {
    this.ipcRenderer.ipcRenderer.send("miniMizeApp", "miniMizeApp");
  }
  maximize() {
    this.ipcRenderer.ipcRenderer.send("maximize", "maximize");
  }
  miniClose() {
    this.ipcRenderer.ipcRenderer.send("miniClose", "miniClose");
  }

  logout() {
    let options = {
      buttons: ["Yes", "No", "Cancel"],
      title: "Do you really want to quit?",
      message:
        "Note: by clicking yes it will update your attendance logout time",
    };
    this.electrondilog.showMessageBox(options).then((response) => {
      if (response.response == 0) {
        this._authService.sendLogoutRequest().subscribe(
          (res) => {
            this._tokenStoreService.remove();
            this.ipcRenderer.ipcRenderer.send("relaunch");
          },
          (err) => {
            if (err.status == 419) {
              this._tokenStoreService.remove();
              this.ipcRenderer.ipcRenderer.send("relaunch");
            }
            if (err.status == 400) {
              this._tokenStoreService.remove();
              this.ipcRenderer.ipcRenderer.send("relaunch");
            }
            if (err.status == 0) {
              this._sbService.shackBarMessage(
                "server error someting went wrong check internet or try again later"
              );
            }
          }
        );
      }
    });
  }
}
