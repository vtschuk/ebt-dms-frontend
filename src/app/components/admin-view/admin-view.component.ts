import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AsyncPipe, NgFor} from "@angular/common";
import {Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Language} from "../../model/language";
import {Role} from "../../model/role";
import {LoginService} from "../../services";
import {User} from "../../model/user";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../intern/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";
import {UserEditDialogContentComponent} from "../intern/user-edit-dialog-content/user-edit-dialog-content.component";
import {UserService} from "../../services/user.service";
import {UserAddDialogContentComponent} from "../intern/user-add-dialog-content/user-add-dialog-content.component";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule
  ],

})
export class AdminViewComponent implements OnInit {

  // Language
  currentLanguage: Language = {id: 0, name: '', aktiv: false}
  selectedLang = ''
  languages: Observable<Language[]> = of()
  languageFormControl = new FormControl('');

  // User, Role, Password

  currentUser: User = {id: 0, username2: '', role: '', password2: ''}
  //currentUser: User = {id:0, username: ''}
  userFormControl = new FormControl('');
  users: Observable<User[]> = of()

  currentRole: Role = {id: 0, name: ''}
  roles: Observable<Role[]> = of()
  roleFormControl = new FormControl('');

  passwd = ''
  protected readonly name = name;

  constructor(private adminService: AdminService,
              private router: Router,
              public dialog: MatDialog,
              private loginService: LoginService,
              private userService: UserService,
              private toastr: ToastrService) {
  }


  //--------------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    console.log('onInit')
    this.languages = this.adminService.getAllLanguages();
    this.roles = this.adminService.getAllRoles();
    this.users = this.adminService.getAllUsers()
  }

  //--------------------------------------------------------------------------------------------------------------------

  // Language
  changeLanguage() {
    console.log(this.currentLanguage)
    this.adminService.changeLanguage(this.currentLanguage).subscribe(() => {
      this.languages = this.adminService.getAllLanguages()
    })
  }

  // Language
  saveLogin() {
    console.log('create Login')
  }

  deleteLogin(user: User) {

    const dialogData = new ConfirmDialogModel('Confirm', 'Are you sure you want to delete user?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      disableClose: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('delete Login')
        this.userService.delete(user.id).subscribe(() => {
          this.users = this.adminService.getAllUsers();
          console.log('delete user ' + user)
        })
      }
    });

  }

  //--------------------------------------------------------------------------------------------------------------------
  gotoFileList() {
    this.router.navigate(['/view'])
  }

  logout() {
    this.loginService.logout()
  }

  about() {
    this.dialog.open(InfoDialogComponent);
  }

  editUserDialog(user: User) {
    this.dialog.open(UserEditDialogContentComponent, {
      disableClose: true,
      data: user
    }).afterClosed().subscribe(() => {
      this.users = this.adminService.getAllUsers();
    })
  }

  addUserDialog() {
    this.dialog.open(UserAddDialogContentComponent, {
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.users = this.adminService.getAllUsers();
    })
  }

  gotoArchivList() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  changePassword() {

  }
}
