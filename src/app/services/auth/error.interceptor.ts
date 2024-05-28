import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginService} from "../login.service";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.loginService.loginValue) {
        // auto logout if 401 or 403 response returned from api
        this.toastr.error("logout from  backend")
        this.loginService.logout();
      }

      const error = err.error?.message || err.statusText;
      //console.error(err);
      this.toastr.error("Error connecting to backend...")
      return throwError(() => error);
    }))
  }
}
