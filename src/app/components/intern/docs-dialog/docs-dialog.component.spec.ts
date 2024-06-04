import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocsDialogComponent} from './docs-dialog.component';

describe('DocsDialogComponent', () => {
  let component: DocsDialogComponent;
  let fixture: ComponentFixture<DocsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocsDialogComponent]
    });
    fixture = TestBed.createComponent(DocsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
