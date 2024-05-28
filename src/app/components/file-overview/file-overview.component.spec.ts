import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileOverviewComponent} from './file-overview.component';

describe('PersonViewComponent', () => {
  let component: FileOverviewComponent;
  let fixture: ComponentFixture<FileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileOverviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
