import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {User} from "../../../model/user";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-edit-dialog-content',
  templateUrl: './user-edit-dialog-content.component.html',
  styleUrls: ['./user-edit-dialog-content.component.css'],
  standalone: true,
  imports: [MatDialogModule, NgIf, MatInputModule, FormsModule, MatIconModule],

})
export class UserEditDialogContentComponent {
  id: number;
  name?: string
  surname?: string
  username2: string
  role: string
  password2: string

  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {
    this.id = user.id
    this.name = user.name
    this.surname = user.surname
    this.username2 = user.username2
    this.role = user.role
    this.password2 = user.password2
  }
}
