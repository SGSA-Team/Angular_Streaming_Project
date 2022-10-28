import { TestBed } from '@angular/core/testing';

import { RechercheService } from './recherche.service';

describe('RechercheService', () => {
  let service: RechercheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechercheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
