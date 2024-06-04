import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  HOST = 'http://localhost:9090'
  HEADERS = {'content-type': 'application/json'}
  constructor(private httpClient: HttpClient) { }

  save(user: User): Observable<User> {
    return  this.httpClient.put<User>(this.HOST + '/api/user/' + user.id, user).pipe()
  }

  delete(id: number) {
    return this.httpClient.delete(this.HOST + '/api/user/'+ id).pipe()
  }

}
