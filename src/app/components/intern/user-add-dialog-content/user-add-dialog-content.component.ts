import {Component, Inject} from '@angular/core';

import {UserService} from "../../../services/user.service";
import {LoginService} from "../../../services";
import {UserEditDialogComponent} from "../user-edit-dialog/user-edit-dialog.component";
import {RegisterLoginRequest} from "../../../model/register.login.request";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-add-dialog-content',
  templateUrl: './user-add-dialog-content.component.html',
  styleUrls: ['./user-add-dialog-content.component.css']
})
export class UserAddDialogContentComponent {

  firstName: string = ''
  lastName: string = ''
  email: string = ''
  username: string = ''
  role: string = ''
  password: string = ''
  constructor(private userService: UserService, private loginService: LoginService, public dialogRef: MatDialogRef<UserEditDialogComponent>) {

  }

  saveLogin() {
    const login: RegisterLoginRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      role: this.role,
      password: this.password

    }
    console.log("create login")
    this.loginService.create(login).subscribe(() => {
      this.dialogRef.close()
    })
  }

  abort() {
    this.dialogRef.close()
  }
}
