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
import {Position} from "../../model/position";
import {Education} from "../../model/education";
import {Profession} from "../../model/profession";
import {Certification} from "../../model/certification";
import {Expertise} from "../../model/expertise";
import {Language} from "../../model/language";
import {Role} from "../../model/role";
import {LoginService} from "../../services";
import {User} from "../../model/user";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../intern/confirm-dialog/confirm-dialog.component";
import {UserEditDialogComponent} from "../intern/user-edit-dialog/user-edit-dialog.component";
import {ToastrService} from "ngx-toastr";
import {InfoDialogComponent} from "../intern/info-dialog/info-dialog.component";
import {UserAddDialogComponent} from "../intern/user-add-dialog/user-add-dialog.component";

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

  //positon
  positions: Observable<Position[]> = of();
  currentPosition: Position = {id: 0, name: ''}
  positionFormControl = new FormControl('');

  //education
  educations: Observable<Education[]> = of()
  currentEducation: Education = {id: 0, name: ''};
  educationFormControl = new FormControl('');

  //profession
  professions: Observable<Profession[]> = of()
  currentProfession: Profession = {id: 0, name: ''}
  professionFormControl = new FormControl('');

  //Certificate
  certificates: Observable<Certification[]> = of()
  currentCertificate: Certification = {id: 0, name: ''}
  certificateFormControl = new FormControl('');

  //expertise
  expertises: Observable<Expertise[]> = of()
  currentExpertise: Expertise = {id: 0, name: ''}
  expertiseFormControl = new FormControl('');

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

  constructor(private adminService: AdminService, private router: Router, public dialog: MatDialog, private loginService: LoginService, private toastr: ToastrService) {
  }

  getText(option: any) {
    return option.name;
  }

  getUsername(user: User) {
    return user.username2;
  }

  ngOnInit(): void {
    console.log('onInit')
    this.positions = this.adminService.getAllPositions()
    this.educations = this.adminService.getAllEducation()
    this.professions = this.adminService.getAllProfessions();
    this.certificates = this.adminService.getAllCertificate();
    this.expertises = this.adminService.getAllExpertise();
    this.languages = this.adminService.getAllLanguages();
    this.roles = this.adminService.getAllRoles();
    this.users = this.adminService.getAllUsers()
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Position
  addPosition() {
    console.log(this.currentPosition)
    if (typeof this.currentPosition === 'string') {
      this.adminService.addPosition({id: 0, name: this.currentPosition}).subscribe(() => {
        this.positions = this.adminService.getAllPositions();
      })
    }
  }

  deletePosition() {
    console.log(this.currentPosition)
    this.adminService.deletePosition(this.currentPosition.id).subscribe(() => {
      this.positions = this.adminService.getAllPositions();
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Education
  addEducation() {
    console.log(this.currentEducation)
    if (typeof this.currentEducation === 'string') {
      this.adminService.addEducation({id: 0, name: this.currentEducation}).subscribe(() => {
        this.educations = this.adminService.getAllEducation()
      })
    }
  }

  deleteEducation() {
    console.log(this.currentEducation)
    this.adminService.deleteEducation(this.currentEducation.id).subscribe(() => {
      this.educations = this.adminService.getAllEducation()
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Profession
  addProfession() {
    if (typeof this.currentProfession === 'string') {
      this.adminService.addProfession({id: 0, name: this.currentProfession}).subscribe(() => {
        this.professions = this.adminService.getAllProfessions();
      })
    }
  }

  deleteProfession() {
    this.adminService.deleteProfession(this.currentProfession.id).subscribe(() => {
      this.professions = this.adminService.getAllProfessions();
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Certificate

  addCertificate() {
    if (typeof this.currentCertificate === 'string') {
      this.adminService.addCertificate({id: 0, name: this.currentCertificate}).subscribe(() => {
        this.certificates = this.adminService.getAllCertificate();
      })
    }
  }

  deleteCertification() {
    this.adminService.deleteCertificate(this.currentCertificate.id).subscribe(() => {
      this.certificates = this.adminService.getAllCertificate()
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Expertise

  addExpertise() {
    if (typeof this.currentExpertise === 'string') {
      this.adminService.addExpertise({id: 0, name: this.currentExpertise}).subscribe(() => {
        this.expertises = this.adminService.getAllExpertise();
      })
    }

  }

  deleteExpertise() {
    this.adminService.deleteExpertise(this.currentExpertise.id).subscribe(() => {
      this.expertises = this.adminService.getAllExpertise();
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Language
  changeLanguage() {
    console.log(this.currentLanguage)
    this.adminService.changeLanguage(this.currentLanguage).subscribe(() => {
      this.languages = this.adminService.getAllLanguages()
    })
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Language
  saveLogin() {
    console.log('create Login')
  }

  deleteLogin() {

    const dialogData = new ConfirmDialogModel('Confirm', 'Are you sure you want to delete user?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: dialogData
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        console.log('delete Login')
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


  protected readonly name = name;

  editUserDialog(user: User) {
    console.log(user)
     const userDialog = new UserEditDialogComponent(this.dialog)
     userDialog.openDialog(user)
  }

  addUserDialog() {
    const userDialog = new UserAddDialogComponent(this.dialog)
    userDialog.openDialog(this.currentUser)
  }

  gotoArchivList() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }

  getSupport() {
    this.toastr.error("Diese Funktion ist noch nicht implementiert")
  }
}
