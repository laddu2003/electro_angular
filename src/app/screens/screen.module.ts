import { TokenInterceptorInterceptor } from "./../interceptors/token-interceptor.interceptor";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import {
  AssesmentComponent,
  DialogContentAssignmentDialog,
} from "./assesment/assesment.component";
import { EmailComponent } from "./email/email.component";
import { ChatComponent } from "./chat/chat.component";
import { MediaComponent } from "./media/media.component";
import { SettingComponent } from "./setting/setting.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    HomeComponent,
    AssesmentComponent,
    EmailComponent,
    ChatComponent,
    MediaComponent,
    SettingComponent,
    ProfileComponent,
    LoginComponent,
    DialogContentAssignmentDialog,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DialogContentAssignmentDialog],
})
export class ScreenModule {}
