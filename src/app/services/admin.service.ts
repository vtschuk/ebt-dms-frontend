import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Language} from "../model/language";
import {Role} from "../model/role";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uri = '/admin'

  constructor(private httpClient: HttpClient) {
  }

  // Languages
  changeLanguage(language: Language) {
    return this.httpClient.post(environment.host + this.uri + '/language', language)
  }

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(environment.host + this.uri + '/language/all')
  }

  // Role
  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.host + this.uri + '/role/all');
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.host + '/api/user/all')
  }
}
