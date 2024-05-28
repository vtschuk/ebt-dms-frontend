import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {UserEditDialogContentComponent} from "../user-edit-dialog-content/user-edit-dialog-content.component";
import {User} from "../../../model/user";



@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class UserEditDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(user: User) {
    this.dialog.open(UserEditDialogContentComponent, {
      data: user
    });
  }
}
