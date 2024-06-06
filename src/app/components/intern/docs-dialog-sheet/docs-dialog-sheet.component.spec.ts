import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DocsDialogSheetComponent} from "./docs-dialog-sheet.component";

describe('DocsDialogSheetComponent', () => {
  let component: DocsDialogSheetComponent;
  let fixture: ComponentFixture<DocsDialogSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocsDialogSheetComponent]
    });
    fixture = TestBed.createComponent(DocsDialogSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
