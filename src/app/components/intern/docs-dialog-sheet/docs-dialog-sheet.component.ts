import {Component} from "@angular/core";
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'docs-dialogs-sheet',
  templateUrl: 'docs-dialog-sheet.component.html',
  standalone: true,
  imports: [MatListModule],
})
export class DocsDialogSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<DocsDialogSheetComponent>) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
