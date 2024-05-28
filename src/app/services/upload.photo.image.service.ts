import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoImageService {
  HOST = 'http://localhost:9090'

  constructor(private httpClient: HttpClient) {
  }

  upload(id: number, data: FormData) {
    return this.httpClient.post(this.HOST + '/uploadphoto/' + id, data).pipe();
  }

  download(_id: number) {
    return this.httpClient.get(`${this.HOST}/uploadphoto/${_id}`, {responseType: 'blob'}).pipe()
  }
}
