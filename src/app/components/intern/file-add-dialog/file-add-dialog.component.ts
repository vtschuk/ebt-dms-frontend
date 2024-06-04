import {Component} from '@angular/core';
import {File} from "../../../model/file";
import {FileService} from "../../../services/file.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-file-add-dialog',
  templateUrl: './file-add-dialog.component.html',
  styleUrls: ['./file-add-dialog.component.css']
})
export class FileAddDialogComponent {
  filenumber: string = ''
  filename: string = ''
  fileissue: string = ''

  constructor(private fileService: FileService,
              //public dialog: MatDialog,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<FileAddDialogComponent>
  ) {
  }

  createFile() {
    const file = new File(0,
      this.filenumber,
      this.filename,
      new Date().toISOString(),
      this.fileissue,
      '',
      false,
      false);

    const fileModel: File = {
      id: 0,
      filenumber: this.filenumber,
      name: this.filename,
      date: new Date().toISOString(),
      issue: this.fileissue,
      description: '',
      archive: false,
      encrypted: false
    }
    this.fileService.createNewFile(fileModel).subscribe(person => {
      this.toastr.success("Neue Akte wird angelegt")
      console.log(fileModel)
      this.dialogRef.close()
    }, () => {
      this.toastr.error("kann keine Akte angelegen")
    })
  }

  abort() {
    this.dialogRef.close()
  }
}
