import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalPlanMealsComponent } from './nutritional-plan-meals.component';

describe('NutritionalPlanMealsComponent', () => {
  let component: NutritionalPlanMealsComponent;
  let fixture: ComponentFixture<NutritionalPlanMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalPlanMealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalPlanMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
