import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadDocFilesInfo} from "../model/upload.doc.files.info";

@Injectable({
  providedIn: 'root'
})
export class UploadDocFilesService {

  HOST = 'http://localhost:9090'

  constructor(private httpClient: HttpClient) {
  }

  uploadFile(personId: number, data: Blob) {
    const formData = new FormData()
    formData.append('file', data)
    return this.httpClient.post(this.HOST + '/uploaddoc/' + personId, formData).pipe();
  }

  getFileListByPersonId(personId: number): Observable<UploadDocFilesInfo[]> {
    return this.httpClient.get<UploadDocFilesInfo[]>(this.HOST + '/uploaddoc/all/' + personId).pipe()
  }

  getUploadFileById(id: number) {
    return this.httpClient.get(this.HOST + '/uploaddoc/' + id, {responseType: 'blob'}).pipe()
  }

  deleteFilebyId(id: number) {
    return this.httpClient.delete(this.HOST + "/uploaddoc/" + id)
  }
}
