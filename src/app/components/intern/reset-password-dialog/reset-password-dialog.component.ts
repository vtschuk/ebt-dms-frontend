import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../services";
import {ChangePasswordRequest} from "../../../model/change.password.request";

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent {
  //password: string = '';
  //newpassword: string = '';
  //newpassword2: string = '';

  changePasswordRequest: ChangePasswordRequest = {
    password: '',
    newpassword: '',
    newpassword2: ''
  }

  constructor(public dialogRef: MatDialogRef<ResetPasswordDialogComponent>, private loginService: LoginService) {
  }

  reset() {
    this.loginService.change(this.changePasswordRequest).subscribe(() => {
      console.log("password changed")
      this.dialogRef.close()
    })
  }

  abort() {
    this.dialogRef.close()
  }
}
