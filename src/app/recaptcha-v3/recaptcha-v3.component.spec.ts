import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaV3Component } from './recaptcha-v3.component';

describe('RecaptchaV3Component', () => {
  let component: RecaptchaV3Component;
  let fixture: ComponentFixture<RecaptchaV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecaptchaV3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaptchaV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
