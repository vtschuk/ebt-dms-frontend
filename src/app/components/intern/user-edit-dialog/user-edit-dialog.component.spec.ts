import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditDialogComponent} from './user-edit-dialog.component';

describe('UserEditDialogComponent', () => {
  let component: UserEditDialogComponent;
  let fixture: ComponentFixture<UserEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditDialogComponent]
    });
    fixture = TestBed.createComponent(UserEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
