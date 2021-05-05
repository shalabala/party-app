import { TestBed } from '@angular/core/testing';

import { ToolbarContentService } from './toolbar.content.service';

describe('Toolbar.ContentService', () => {
  let service: ToolbarContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
