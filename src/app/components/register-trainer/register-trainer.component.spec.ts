import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrainerComponent } from './register-trainer.component';

describe('RegisterTrainerComponent', () => {
  let component: RegisterTrainerComponent;
  let fixture: ComponentFixture<RegisterTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegisterTrainerComponent]
    });
    fixture = TestBed.createComponent(RegisterTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
