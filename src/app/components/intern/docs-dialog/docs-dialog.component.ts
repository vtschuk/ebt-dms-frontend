import {Component} from '@angular/core';
import {MatBottomSheet, MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {DocsDialogSheetComponent} from "../docs-dialog-sheet/docs-dialog-sheet.component";

@Component({
  selector: 'docs-dialogs',
  templateUrl: 'docs-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule],
})
export class DocsDialogComponent {
  constructor(private _bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(DocsDialogSheetComponent);
  }
}
