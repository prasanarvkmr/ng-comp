// filepath: /d:/Prasana/Code/angular/ng-comp/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RecaptchaV2Component } from './recaptcha-v2/recaptcha-v2.component';
import { RecaptchaV3Component } from './recaptcha-v3/recaptcha-v3.component';

export const routes: Routes = [
  { path: 'recaptcha-v2', component: RecaptchaV2Component },
  { path: 'recaptcha-v3', component: RecaptchaV3Component },
  { path: '', redirectTo: '/recaptcha-v2', pathMatch: 'full' }
];