import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutritionalPlansComponent } from './nutritional-plans.component';

describe('NutritionalPlansComponent', () => {
  let component: NutritionalPlansComponent;
  let fixture: ComponentFixture<NutritionalPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalPlansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
