import { ElectronService } from "app/core/services";
import { ipcRenderer } from "electron";
import { ScreenModule } from "./screens/screen.module";
import "reflect-metadata";
import "../polyfills";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MenuoneComponent } from "./menuone/menuone.component";
import { LoginScreenComponent } from "./login-screen/login-screen.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuoneComponent,
    LoginScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ScreenModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements OnInit {
  ipcRenderer;
  constructor(private es: ElectronService) {
    // es.ipcRenderer.on("version", (e, t) => {
    //   console.log(e, t);
    // });
    // this.ipcRenderer = window
    //   .require("electron")
    //   .ipcRenderer.on("version", (e, t) => {
    //     console.log(e, t);
    //   });
    // console.log(this.ipcRenderer);
    // this.ipcRenderer
    //   .on("version", (e, t) => {
    //     console.log(e, t);
    //   })
    //   .on("version", (e, t) => {
    //     console.log(e, t);
    //   });
    // es.ipcRenderer.on("version", (res) => {
    //   console.log(res);
    // });
    // this.ipcRenderer.ipcRenderer.on("download-progress", (event, text) => {
    //   console.log(event, text);
    //   console.log("check");
    // });
    // this.ipcRenderer.ipcRenderer.on("message", (event, text) => {
    //   console.log(event, text);
    //   console.log("message");
    // });
    // this.ipcRenderer.ipcRenderer.on("version", (event, text) => {
    //   console.log("version", event, text);
    //   console.log("message");
    // });
  }
  ngOnInit() {}
}
