import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Address} from '../../model/address';
import {Person} from '../../model/person';
import {PersonService} from '../../services/person.service';
import * as moment from "moment";
import {MatDialog} from "@angular/material/dialog";
import {FilepickerDirective} from "../../directives/filepicker.directive";
import {UploadPhotoImageService} from "../../services/upload.photo.image.service";
import {UploadDocFilesService} from "../../services/upload.doc.files.service";
import {UploadDocFilesInfo} from "../../model/upload.doc.files.info";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {

  currentPerson: Person = new Person(
    0,
    '',
    '',
    '',
    new Address(
      1234,
      '',
      '',
      '',
      '',
      1),
    new Date().toISOString(),
    ""
  );

  submitted = false;
  birthsday: string = ''
  files: string[] = []

  _selectedFiles: UploadDocFilesInfo[] = [];
  _multiple = true;

  public photo?: any

  // @ts-ignore
  @ViewChild('buttonPicker', {static: true})
    // @ts-ignore
  _buttonPicker: FilepickerDirective;


  constructor(private personService: PersonService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private uploadPhotoService: UploadPhotoImageService,
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
        personId: this.currentPerson.id,
        name: files[i].name,
        type: files[i].type,
        file: files[i]
      })
    }
  }

  _onReset() {
    this._selectedFiles = [];
  }

  private loadFile(id: number) {
    if (id != 0) {
      this.personService.getPersonById(id).subscribe(data => {
        console.log(data)
        this.currentPerson = data;
        if (data.address === null) {
          this.currentPerson.address = new Address(12345, '', '', '', '', 0);
        }
        if (this.currentPerson.birthsday) {
          const date = new Date(this.currentPerson.birthsday);
          this.birthsday = moment(date).format('YYYY-MM-DD')
        }
        this.photo = undefined;
        this.uploadPhotoService.download(this.currentPerson.id).subscribe(data => {
          console.log(data)
          this.photo = URL.createObjectURL(data)
        })

        this.uploadDocFilesService.getFileListByPersonId(this.currentPerson.id).subscribe(filelist => {
          this._selectedFiles = filelist;
        })
      }, () => {
        this.toastr.error('kann keine Person mit der ID' + id + ' finden')
      });
    }
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
        console.log('Delete Entry:' + this.currentPerson.id);
        this.personService.deletePerson(this.currentPerson.id).subscribe(() => {
          this.toastr.warning("Akte gelöscht: " + this.currentPerson.id)
        }, () => {
          this.toastr.error("kann keine Akte löschen: " + this.currentPerson.id)
        }, () => {
          this.router.navigate(['/view'])
        })
      }
    });


  }

  saveEntry() {
    console.log('Save Entry:' + JSON.stringify(this.currentPerson));
    this.personService.savePerson(this.currentPerson.id, this.currentPerson).subscribe(() => {
      this.toastr.success("Akte aktualisiert")
    }, () => {
      this.toastr.error("Speichern der Akte fehlgeschlagen");
    });

    if (this._selectedFiles && this._selectedFiles.length > 0) {
      this._selectedFiles.filter(file => file.file != undefined).forEach(file => {
        this.uploadDocFilesService.uploadFile(this.currentPerson.id, file.file as Blob).subscribe()
      })
    }
  }

  listEntries() {
    this.router.navigate(['/view'])
  }

  viewEntry() {
    console.log('view Entry' + this.currentPerson.id)
    this.router.navigate(['/overview/' + this.currentPerson.id])
  }

  getNextEntry() {
    console.log('Get Next Entry')
    this.personService.getAllPersons().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id > this.currentPerson.id)

      if (filtered && filtered.length > 0) {
        this.currentPerson = filtered[0]
        this.reload()
      } else {
        this.toastr.info('Keine weitere Akten vorhanden')
      }
    })
  }

  getPreviousEntry() {
    this.personService.getAllPersons().subscribe(personen => {
      const filtered = personen.filter(person => person.id < this.currentPerson.id)

      if (filtered && filtered.length > 0) {
        this.currentPerson = filtered[filtered.length - 1]
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
    this.loadFile(this.currentPerson.id)
  }

  about() {
    this.dialog.open(InfoDialogComponent)

  }

  administrate() {
    this.router.navigate(['/admin'])
  }

  setDate($event: any) {
    this.birthsday = $event
    console.log(this.birthsday)
    const isoDateTimeString = new Date(this.birthsday).toISOString()
    console.log(isoDateTimeString)
    this.currentPerson.birthsday = new Date(this.birthsday).getTime().toString()
  }

  selectFile($event: any) {
    let elem = $event.target;
    if (elem.files.length > 0) {
      const formData = new FormData();
      formData.append('file', elem.files[0], elem.files[0].name)
      this.uploadPhotoService.upload(this.currentPerson.id, formData)
        .subscribe((data) => {
            console.log(data)
            this.uploadPhotoService.download(this.currentPerson.id).subscribe(data => {
              console.log(data)
              this.photo = URL.createObjectURL(data)
            })
          },
          (error) => {
            this.toastr.error("Error uploading file...")
          })
    }
  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  encryptFile() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }
}
