import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  save(user: User): Observable<User> {
    return  this.httpClient.put<User>('', user).pipe()
  }
}
