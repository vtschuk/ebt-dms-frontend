import {Injectable} from '@angular/core';
import {Person} from '../model/person'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  HOST = 'http://localhost:9090'
  uri = '/file'
  HEADERS = {'content-type': 'application/json'}

  constructor(private httpClient: HttpClient) {
  }

  getAllPersons(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.HOST + this.uri + '/all', {'headers': this.HEADERS}).pipe();
  }

  getPersonById(id: number): Observable<Person> {
    return this.httpClient.get<Person>(this.HOST + this.uri + '/get/' + id, {'headers': this.HEADERS}).pipe();
  }

  createNewPerson(person: Person): Observable<Person> {
    const body = JSON.stringify(person)
    return this.httpClient.post<Person>(this.HOST + this.uri + '/create', body, {'headers': this.HEADERS}).pipe();
  }

  savePerson(id: number, person: Person): Observable<Person> {
    const body = JSON.stringify(person)
    return this.httpClient.put<Person>(this.HOST + this.uri + '/save/' + id, body, {'headers': this.HEADERS}).pipe();
  }

  deletePerson(id: number): Observable<Person> {
    return this.httpClient.delete<Person>(this.HOST + this.uri + '/delete/' + id).pipe();
  }
}
