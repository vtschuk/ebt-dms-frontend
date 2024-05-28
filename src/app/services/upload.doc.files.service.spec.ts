import {TestBed} from '@angular/core/testing';

import {UploadDocFilesService} from './upload.doc.files.service';

describe('UploadDocFilesService', () => {
  let service: UploadDocFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadDocFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
