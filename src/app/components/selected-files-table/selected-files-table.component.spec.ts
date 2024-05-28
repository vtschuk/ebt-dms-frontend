import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedFilesTableComponent} from './selected-files-table.component';

describe('SelectedFilesTableComponent', () => {
  let component: SelectedFilesTableComponent;
  let fixture: ComponentFixture<SelectedFilesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedFilesTableComponent]
    });
    fixture = TestBed.createComponent(SelectedFilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
