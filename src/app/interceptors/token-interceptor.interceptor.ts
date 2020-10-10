import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AppCookiesService } from "../service/cookies/app-cookies.service";
import { TokenStoreService } from "app/service/token/token-store.service";

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private _tokenService: TokenStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = request.headers
      .set("Content-Type", "application/json")
      .set("Authorization", `${this._tokenService.get()}`);
    const authReq = request.clone({ headers });
    return next.handle(authReq);
  }
}
