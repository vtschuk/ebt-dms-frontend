import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class InfoDialogComponent {
  longText = `Verwaltung von digitalen Akten im Unternehmen`;
}
