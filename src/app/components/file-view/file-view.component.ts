import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {File} from '../../model/file';
import {FileService} from '../../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

  currentFile: File = new File(0, '', '', '', new Date().toISOString(), false, false);

  constructor(private fileService: FileService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialog: MatDialog
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.fileService.getFileById(id).subscribe(file => {
      this.currentFile = file
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
    this.router.navigate(['/akte/' + this.currentFile.id])
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
    this.fileService.getAllFiles().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id > this.currentFile.id)
      if (filtered) {
        if (filtered.length >= 1) {
          this.currentFile = filtered[0];

        } else {
          this.toastr.info('Keine weitere Akten vorhanden')
        }
      }
    })
  }

  getPreviousEntry() {
    console.log('Get Previous Entry')
    const id = this.currentFile.id;
    this.fileService.getAllFiles().subscribe(personen => {
      console.log(personen)
      const filtered = personen.filter(person => person.id < this.currentFile.id)

      if (filtered && filtered.length >= 1) {
        console.log('filtered persons: ' + filtered)
        this.currentFile = filtered[filtered.length - 1]

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
