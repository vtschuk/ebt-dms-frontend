import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../model/person';
import {FileService} from '../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Address} from '../../model/address';
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  @ViewChild('htmlData')
  htmlData!: ElementRef;

  currentPerson: Person = new Person(0, '', '', '', new Address(1234, '', '', '', '', 1), new Date().toISOString(), "");

  constructor(private personService: FileService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.personService.getPersonById(id).subscribe(person => {
      this.currentPerson = person
      if (person.address === null) {
        this.currentPerson.address = new Address(1234, '', '', '', '', 1)
      }
    }, error => {
      this.toastr.error("kann die Akte nicht abrufen");
    });
  }

  ngOnInit(): void {
  }

  listEntries() {
    this.router.navigate(['/view'])
  }

  editFile() {
    this.router.navigate(['/akte/' + this.currentPerson.id])
  }

  createPdf(): void {
    console.log('Create PDF')
    const DATA = document.getElementById('htmlData');

    if (DATA !== null) {
      html2canvas(DATA).then(canvas => {

        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;

        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

        PDF.save('angular-demo.pdf');
      });
    }
  }

  getNextEntry() {
    console.log('Get Next Entry')
    this.personService.getAllPersons().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id > this.currentPerson.id)
      if (filtered) {
        if (filtered.length >= 1) {
          this.currentPerson = filtered[0];
          if (!this.currentPerson.address) {
            this.currentPerson.address = new Address(1234, '', '', '', '', 1)
          }
        } else {
          this.toastr.info('Keine weitere Akten vorhanden')
        }
      }
    })
  }

  getPreviousEntry() {
    console.log('Get Previous Entry')
    const id = this.currentPerson.id;
    this.personService.getAllPersons().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id < this.currentPerson.id)

      if (filtered && filtered.length >= 1) {
        console.log('filtered persons: ' + filtered)
        this.currentPerson = filtered[filtered.length - 1]
        if (filtered[filtered.length - 1].address === null) {
          this.currentPerson.address = new Address(1234, '', '', '', '', 1)
        }
      } else {
        this.toastr.info('Keine weitere Akten vorhanden')
      }

    })
  }

  downloadPersonFile() {

  }

  about() {
    this.dialog.open(InfoDialogComponent);
  }

  administrate() {
    this.router.navigate(['/admin'])
  }

  linkFile() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  sendFile() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }
}
