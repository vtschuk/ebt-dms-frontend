import { Component } from '@angular/core';
import {File} from "../../../model/file";
import {FileService} from "../../../services/file.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
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
              public dialog: MatDialog,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<FileAddDialogComponent>
    ) {
  }
  createFile() {
    var file = new File(0,
      this.filename,
      this.fileissue,
      '',
      new Date().toISOString(), false, false);

    this.fileService.createNewFile(file).subscribe(person => {
      this.toastr.success("Neue Akte wird angelegt")
      console.log(person)
      this.dialogRef.close()
      this.fileService.getAllFiles().subscribe(personen => {
        //this.dataSource.data = personen
      }, () => {
        this.toastr.error("kann keine Aktenliste abrufen")
      });
    }, () => {
      this.toastr.error("kann keine Akte angelegen")
    })
  }

  abort() {
    this.dialogRef.close()
  }
}
