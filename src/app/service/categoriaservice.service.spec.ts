import { TestBed, inject } from '@angular/core/testing';

import { CategoriaserviceService } from './categoriaservice.service';

describe('CategoriaserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaserviceService]
    });
  });

  it('should be created', inject([CategoriaserviceService], (service: CategoriaserviceService) => {
    expect(service).toBeTruthy();
  }));
});
