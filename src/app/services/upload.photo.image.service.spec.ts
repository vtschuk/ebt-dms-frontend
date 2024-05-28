import {TestBed} from '@angular/core/testing';

import {UploadPhotoImageService} from './upload.photo.image.service';

describe('UploadPhotoImageService', () => {
  let service: UploadPhotoImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPhotoImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
