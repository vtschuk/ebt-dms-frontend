import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {User} from "../../../model/user";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../services/user.service";
import {MatButtonModule} from "@angular/material/button";
import {UserEditDialogComponent} from "../user-edit-dialog/user-edit-dialog.component";
import {LoginService} from "../../../services";

@Component({
  selector: 'app-user-edit-dialog-content',
  templateUrl: './user-edit-dialog-content.component.html',
  styleUrls: ['./user-edit-dialog-content.component.css'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatInputModule, FormsModule, MatIconModule, MatButtonModule],

})
export class UserEditDialogContentComponent {
  id: number = 0;
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  username2: string = ''
  role: string = ''
  password2: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private userService: UserService, private loginService: LoginService, public dialogRef: MatDialogRef<UserEditDialogComponent>) {
    this.updateValues(user)
  }

  saveLogin() {
    const user = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username2: this.username2,
      role: this.role,
      password2: this.password2
    }
    console.log("save login")
    this.userService.save(user).subscribe(data => {
      //this.updateValues(data)
      this.dialogRef.close()
    })

  }

  abort() {
    this.dialogRef.close()
  }

  private updateValues(user: User) {
    this.id = user.id
    this.firstName = user.firstName || ''
    this.lastName = user.lastName || ''
    this.email = user.email || ''
    this.username2 = user.username2
    this.role = user.role
    this.password2 = user.password2
  }
}
