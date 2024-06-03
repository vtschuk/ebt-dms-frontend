import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../model/user";
import {UserEditDialogContentComponent} from "../user-edit-dialog-content/user-edit-dialog-content.component";

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.css']
})
export class UserAddDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(user: User) {
    this.dialog.open(UserEditDialogContentComponent, {
      data: user
    });
  }
}
