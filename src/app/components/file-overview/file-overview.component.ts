import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IFile} from '../../model/file';
import {FileService} from '../../services/file.service';
import {Router, RouterModule} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
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
import {FileAddDialogComponent} from "../intern/file-add-dialog/file-add-dialog.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatTooltipModule, RouterModule, MatDividerModule, MatIconModule, DatePipe],
})
export class FileOverviewComponent implements OnInit, AfterViewInit {

  files: IFile[] = [];
  displayedColumns: string[] = ['filenumber', 'name', 'editor', 'thema', 'date', 'ansicht', "edit", "delete"];
  dataSource: MatTableDataSource<IFile> = new MatTableDataSource<IFile>(this.files);

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{}

  constructor(
    private fileService: FileService,
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
    console.log("Aktenliste neu einlesen")
    this.files = []
    this.fileService.getAllFiles().subscribe(files => {
      this.dataSource.data = files
    }, () => {
      this.toastr.error("kann keine Aktenliste abrufen")
    });
  }

  addNewEntry() {
    this.dialog.open(FileAddDialogComponent, {
      maxWidth: '450px',
      minHeight: '350px',
      closeOnNavigation: true,
      disableClose: true,
      data: null
    }).afterClosed().subscribe(() => this.refreshView())
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
        this.fileService.deleteFile(id).subscribe(() => {
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

  getDocu() {

  }
}
