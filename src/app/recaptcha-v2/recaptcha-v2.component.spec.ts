import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaptchaV2Component } from './recaptcha-v2.component';

describe('RecaptchaV2Component', () => {
  let component: RecaptchaV2Component;
  let fixture: ComponentFixture<RecaptchaV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecaptchaV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaptchaV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
