import {Injectable} from '@angular/core';
import {File} from '../model/file'
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  HOST = 'http://localhost:9090'
  uri = '/file'
  HEADERS = {'content-type': 'application/json'}

  constructor(private httpClient: HttpClient) {
  }

  getAllFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.HOST + this.uri + '/all', {'headers': this.HEADERS}).pipe();
  }

  getFileById(id: number): Observable<File> {
    return this.httpClient.get<File>(this.HOST + this.uri + '/get/' + id, {'headers': this.HEADERS}).pipe();
  }

  createNewFile(file: File): Observable<File> {
    const body = JSON.stringify(file)
    return this.httpClient.post<File>(this.HOST + this.uri + '/create', body, {'headers': this.HEADERS}).pipe();
  }

  saveFile(id: number, file: File): Observable<File> {
    const body = JSON.stringify(file)
    return this.httpClient.put<File>(this.HOST + this.uri + '/save/' + id, body, {'headers': this.HEADERS}).pipe();
  }

  deleteFile(id: number): Observable<File> {
    return this.httpClient.delete<File>(this.HOST + this.uri + '/delete/' + id).pipe();
  }
}
