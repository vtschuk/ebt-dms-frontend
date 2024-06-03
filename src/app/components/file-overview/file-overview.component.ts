import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IPerson, Person} from '../../model/person';
import {FileService} from '../../services/file.service';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Address} from '../../model/address';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../../services";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../intern/confirm-dialog/confirm-dialog.component";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";

@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatTooltipModule, RouterModule, MatDividerModule, MatIconModule],
})
export class FileOverviewComponent implements OnInit, AfterViewInit {

  personen: IPerson[] = [];
  displayedColumns: string[] = ['id', 'name', 'editor', 'thema', 'ansicht', "edit", "delete"];
  dataSource: MatTableDataSource<IPerson> = new MatTableDataSource<IPerson>(this.personen);

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{}

  constructor(
    private personService: FileService,
    private route: Router,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.refreshView()
  }

  refreshView() {
    this.personen = []
    this.personService.getAllPersons().subscribe(personen => {
      this.dataSource.data = personen
    }, () => {
      this.toastr.error("kann keine Aktenliste abrufen")
    });
  }
  addNewEntry() {


    var person = new Person(0, 'Vorname', 'Nachname', 'person@mail.org', new Address(1234, '', '', '', '', 1), new Date().toISOString(), "");
    console.log('Add a new Entry');
    this.personService.createNewPerson(person).subscribe(person => {
      this.toastr.success("Neue Akte wird angelegt")
      console.log(person)
      this.personService.getAllPersons().subscribe(personen => {
        this.dataSource.data = personen
      }, () => {
        this.toastr.error("kann keine Aktenliste abrufen")
      });
    }, () => {
      this.toastr.error("kann keine Akte angelegen")
    })
  }

  administrate() {
    this.router.navigate(['/admin'])
  }

  logout() {
    this.loginService.logout()
  }

  about() {
    this.dialog.open(InfoDialogComponent)
  }

  deleteFile(id: number) {
    const dialogData = new ConfirmDialogModel('Akte löschen ?', 'Sind Sie sicher, dass Sie diese Akte löschen wollen?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('delete file')
        this.personService.deletePerson(id).subscribe(() => {
          this.toastr.warning("Akte gelöscht: " + id)
        }, () => {
          this.toastr.error("kann keine Akte löschen: " + id)
        }, () => {
          this.refreshView()
        })
      }
    });

  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }
}
