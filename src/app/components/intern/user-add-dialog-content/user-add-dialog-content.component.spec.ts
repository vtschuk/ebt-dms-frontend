import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddDialogContentComponent } from './user-add-dialog-content.component';

describe('UserAddDialogContentComponent', () => {
  let component: UserAddDialogContentComponent;
  let fixture: ComponentFixture<UserAddDialogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddDialogContentComponent]
    });
    fixture = TestBed.createComponent(UserAddDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
