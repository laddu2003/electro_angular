import { TokenStoreService } from "./../service/token/token-store.service";
import { SnackbarService } from "./../service/snackbar/snackbar.service";
import { AppCookiesService } from "./../service/cookies/app-cookies.service";
import { AppAuthService } from "./../service/auth/app-auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ElectronService } from "app/core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login-screen.component.html",
  styleUrls: ["./login-screen.component.scss"],
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private ipcRenderer: ElectronService,
    private es: ElectronService,
    private _fb: FormBuilder,
    private _auth: AppAuthService,
    private _cookies: AppCookiesService,
    private route: Router,
    private _snackBar: SnackbarService,
    private _tokenStoreService: TokenStoreService
  ) {}
  miniMize() {
    this.ipcRenderer.ipcRenderer.send("miniMizeApp", "miniMizeApp");
  }
  maximize() {
    this.ipcRenderer.ipcRenderer.send("maximize", "maximize");
  }
  miniClose() {
    this.ipcRenderer.ipcRenderer.send("miniClose", "miniClose");
  }
  submit() {
    console.log("hi");

    // this.es.ipcRenderer.on("version", (e, text) => {
    //   console.log(text);
    // });
    // this.es.ipcRenderer.send("i-click-login", "login");
    // this.es.ipcRenderer.on("you-click-on-login", (e, option) => {
    //   console.log(option);
    // });
    // this._auth.send_login_request("/login", this.loginForm.value).subscribe(
    //   (res) => {
    //     let authData = res.body;
    //     this.handleResponseToken(authData);
    //     // setTimeout(() => {
    //     //   window.location.reload();
    //     // }, 1000);
    //   },
    //   (err) => {
    //     console.log(err.error.message);
    //     if (err.status == 410) {
    //       this._snackBar.shackBarMessage(err.error.message);
    //     }
    //     if (err.status == 401) {
    //       this._snackBar.shackBarMessage(err.error.message);
    //     }
    //     if (err.status == 0) {
    //       this._snackBar.shackBarMessage(
    //         "hmm.. something went wrong please check your internet and try again"
    //       );
    //     }
    //     // console.log(err);
    //   }
    // );
  }
  handleResponseToken(data) {
    this._tokenStoreService.handle(data.token);
    // this.route.navigateByUrl('/home');
    // this._cookies.setCookie("_token", data.token, 30);
    this.ipcRenderer.ipcRenderer.send("relaunch");
  }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    console.log(";wtf");
  }
}
