import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {File} from '../../model/file';
import {FileService} from '../../services/file.service';
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {FilepickerDirective} from "../../directives/filepicker.directive";
import {UploadDocFilesService} from "../../services/upload.doc.files.service";
import {UploadDocFilesInfo} from "../../model/upload.doc.files.info";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../intern/confirm-dialog/confirm-dialog.component";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {

  currentFile: File = new File(
    0,
    '',
    '',
    new Date().toISOString(),
    '',
    '',
    false,
    false
  );

  submitted = false;
  date: string = ''
  files: string[] = []

  _selectedFiles: UploadDocFilesInfo[] = [];
  _multiple = true;

  public photo?: any

  // @ts-ignore
  @ViewChild('buttonPicker', {static: true})
    // @ts-ignore
  _buttonPicker: FilepickerDirective;


  constructor(private personService: FileService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private uploadDocFilesService: UploadDocFilesService,
              public dialog: MatDialog
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFile(id)
  }


  _onFilesChanged(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this._selectedFiles = this._selectedFiles.concat({
        id: 0,
        personId: this.currentFile.id,
        name: files[i].name,
        type: files[i].type,
        file: files[i]
      })
    }
  }

  _onReset() {
    this._selectedFiles = [];
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
  }

  deleteEntry() {
    const dialogData = new ConfirmDialogModel('Akte löschen ?', 'Sind Sie sicher, dass Sie diese Akte löschen wollen?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: dialogData
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('Delete Entry:' + this.currentFile.id);
        this.personService.deleteFile(this.currentFile.id).subscribe(() => {
          this.toastr.warning("Akte gelöscht: " + this.currentFile.id)
        }, () => {
          this.toastr.error("kann keine Akte löschen: " + this.currentFile.id)
        }, () => {
          this.router.navigate(['/view'])
        })
      }
    });


  }

  saveEntry() {
    console.log('Save Entry:' + JSON.stringify(this.currentFile));
    this.personService.saveFile(this.currentFile.id, this.currentFile).subscribe(() => {
      this.toastr.success("Akte aktualisiert")
    }, () => {
      this.toastr.error("Speichern der Akte fehlgeschlagen");
    });

    if (this._selectedFiles && this._selectedFiles.length > 0) {
      this._selectedFiles.filter(file => file.file != undefined).forEach(file => {
        this.uploadDocFilesService.uploadFile(this.currentFile.id, file.file as Blob).subscribe()
      })
    }
  }

  listEntries() {
    this.router.navigate(['/view'])
  }

  viewEntry() {
    console.log('view Entry' + this.currentFile.id)
    this.router.navigate(['/overview/' + this.currentFile.id])
  }

  getNextEntry() {
    console.log('Get Next Entry')
    this.personService.getAllFiles().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id > this.currentFile.id)

      if (filtered && filtered.length > 0) {
        this.currentFile = filtered[0]
        this.reload()
      } else {
        this.toastr.info('Keine weitere Akten vorhanden')
      }
    })
  }

  getPreviousEntry() {
    this.personService.getAllFiles().subscribe(personen => {
      const filtered = personen.filter(person => person.id < this.currentFile.id)

      if (filtered && filtered.length > 0) {
        this.currentFile = filtered[filtered.length - 1]
        this.reload()
      } else {
        this.toastr.info("keine weitere Akten vorhanden")
      }
    })
  }

  archivEntry() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  reload() {
    this.loadFile(this.currentFile.id)
  }

  about() {
    this.dialog.open(InfoDialogComponent)

  }

  administrate() {
    this.router.navigate(['/admin'])
  }

  setDate($event: any) {
    this.date = $event
    console.log(this.date)
    const isoDateTimeString = new Date(this.date).toISOString()
    console.log(isoDateTimeString)
    this.currentFile.date = new Date(this.date).getTime().toString()
  }

  selectFile($event: any) {
    let elem = $event.target;
    if (elem.files.length > 0) {
      const formData = new FormData();
      formData.append('file', elem.files[0], elem.files[0].name)

    }
  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  encryptFile() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  private loadFile(id: number) {
    if (id != 0) {
      this.personService.getFileById(id).subscribe(data => {
        console.log(data)
        this.currentFile = data
        if (this.currentFile.date) {
          const date = new Date(this.currentFile.date);
          this.date = moment(date).format('YYYY-MM-DD')
        }

        this.uploadDocFilesService.getFileListByPersonId(this.currentFile.id).subscribe(filelist => {
          this._selectedFiles = filelist;
        })
      }, () => {
        this.toastr.error('kann keine Person mit der ID' + id + ' finden')
      });
    }
  }
}
