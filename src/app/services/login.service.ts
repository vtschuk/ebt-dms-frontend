import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ResponseToken} from "../model/responsetoken";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {RegisterLoginRequest} from "../model/register.login.request";
import {ChangePasswordRequest} from "../model/change.password.request";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  HOST = 'http://localhost:9090'
  HEADERS = {'content-type': 'application/json'}
  public token: Observable<ResponseToken | null>
  //Token
  private tokenSubject: BehaviorSubject<ResponseToken | null>;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.tokenSubject = new BehaviorSubject<ResponseToken | null>(null);
    this.token = this.tokenSubject.asObservable();
  }

  public get loginValue() {
    return this.tokenSubject.value;
  }

  loginas(username: string, password: string): Observable<ResponseToken> {
    return this.httpClient.post<ResponseToken>(this.HOST + '/api/login', {
      username,
      password
    }, {'headers': this.HEADERS})
      .pipe(map(token => {
        this.tokenSubject.next(token)
        return token
      }))
  }

  //todo: logout backend
  logout() {
    console.log("logout....")
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  create(login: RegisterLoginRequest): Observable<User> {
    return this.httpClient.post<User>(this.HOST + '/api/login/create', login).pipe()
  }

  change(changePasswordRequest: ChangePasswordRequest) {
    return this.httpClient.post<ResponseToken>(this.HOST + '/api/login/change', changePasswordRequest, {'headers': this.HEADERS})
      .pipe(map(token => {
        this.tokenSubject.next(token)
        return token
      }))
  }
}
