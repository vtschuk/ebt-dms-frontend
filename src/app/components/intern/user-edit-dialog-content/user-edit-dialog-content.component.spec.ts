import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserEditDialogContentComponent} from './user-edit-dialog-content.component';

describe('UserEditDialogContentComponent', () => {
  let component: UserEditDialogContentComponent;
  let fixture: ComponentFixture<UserEditDialogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditDialogContentComponent]
    });
    fixture = TestBed.createComponent(UserEditDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
