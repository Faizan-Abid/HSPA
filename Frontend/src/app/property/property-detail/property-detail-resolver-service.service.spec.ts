import { TestBed } from '@angular/core/testing';

import { PropertyDetailResolverServiceService } from './property-detail-resolver-service.service';

describe('PropertyDetailResolverServiceService', () => {
  let service: PropertyDetailResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyDetailResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
