import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAddDialogComponent } from './file-add-dialog.component';

describe('FileAddDialogComponent', () => {
  let component: FileAddDialogComponent;
  let fixture: ComponentFixture<FileAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileAddDialogComponent]
    });
    fixture = TestBed.createComponent(FileAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
