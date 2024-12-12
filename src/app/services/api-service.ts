import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private verifyRecaptchaUrl = 'http://localhost:4000/verify-recaptcha';
  private verifyRecaptchaV3Url = 'http://localhost:4000/verify-recaptcha-v3';


  constructor(private http: HttpClient) {}

  verifyRecaptcha(token: string): Observable<any> {
    return this.http.post(this.verifyRecaptchaUrl, { token });
  }

  verifyRecaptchaV3(token: string): Observable<any> {
    return this.http.post(this.verifyRecaptchaV3Url, { token });
  }
}