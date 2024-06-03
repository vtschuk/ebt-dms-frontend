import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {User} from "../../../model/user";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../../services/user.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-user-edit-dialog-content',
  templateUrl: './user-edit-dialog-content.component.html',
  styleUrls: ['./user-edit-dialog-content.component.css'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatInputModule, FormsModule, MatIconModule, MatButtonModule],

})
export class UserEditDialogContentComponent {
  id: number;
  name: string = ''
  surname: string = ''
  username2: string
  role: string
  password2: string

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private userService: UserService ) {
    this.id = user.id
    this.name = user.name || ''
    this.surname = user.surname || ''
    this.username2 = user.username2
    this.role = user.role
    this.password2 = user.password2
  }

  saveLogin() {
    console.log("save login")
    const user = {id: this.id, name: this.name, surname: this.surname, username2: this.username2, role: this.role, password2: this.password2}
    this.userService.save(user).subscribe(data => {

    })
  }

  abort() {

  }
}
