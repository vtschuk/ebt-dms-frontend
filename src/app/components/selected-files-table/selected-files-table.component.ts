import {Component, Input} from '@angular/core';
import {UploadDocFilesInfo} from "../../model/upload.doc.files.info";
import {UploadDocFilesService} from "../../services/upload.doc.files.service";

@Component({
  selector: 'app-selected-files-table',
  templateUrl: './selected-files-table.component.html',
  styleUrls: ['./selected-files-table.component.css']
})


export class SelectedFilesTableComponent {
  _displayedColumns = ['name', 'type', 'actions'];

  @Input()
  files: UploadDocFilesInfo[] = [];

  constructor(private uploadDocFilesService: UploadDocFilesService) {
  }


  viewFile(file: any) {
    this.uploadDocFilesService.getUploadFileById(file.id).subscribe(data => {
      console.log(data)
      window.open(URL.createObjectURL(data as Blob))
    })
  }

  deleteFile(file: any) {
    this.uploadDocFilesService.deleteFilebyId(file.id).subscribe(() => {
      this.files = this.files.filter(entry => entry.id !== file.id)
    })
  }
}
