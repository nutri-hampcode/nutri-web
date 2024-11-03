import { TestBed } from '@angular/core/testing';

import { NutritionalPlanService } from './nutritional-plan.service';

describe('NutritionalPlanService', () => {
  let service: NutritionalPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionalPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
