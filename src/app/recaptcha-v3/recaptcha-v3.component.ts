import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { ApiService } from '../services/api-service';


@Component({
  selector: 'app-recaptcha-v3',
  imports: [RecaptchaV3Module],
  templateUrl: './recaptcha-v3.component.html',
  styleUrl: './recaptcha-v3.component.css'
})
export class RecaptchaV3Component implements OnInit {
  constructor(private recaptchaV3Service: ReCaptchaV3Service, private apiService: ApiService, 
    // @Inject(PLATFORM_ID) private platformId: Object
) {}

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   this.loadRecaptchaScript().then(() => {
    //     this.recaptchaV3Service.execute('homepage')
    //       .subscribe((token) => {
    //         console.log('reCAPTCHA v3 token:', token);
    //         this.verifyToken(token);
    //       });
    //   }).catch(error => {
    //     console.error('Error loading reCAPTCHA script:', error);
    //   });
    // }
    this.recaptchaV3Service.execute('homepage')
          .subscribe((token) => {
            console.log('reCAPTCHA v3 token:', token);
            this.verifyToken(token);
          });
  }

  // loadRecaptchaScript(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = 'https://www.google.com/recaptcha/api.js?render=<secretkey>';
  //     script.async = true;
  //     script.defer = true;
  //     script.onload = () => resolve();
  //     script.onerror = (error) => reject(error);
  //     document.head.appendChild(script);
  //   });
  // }

  verifyToken(token: string) {
    this.apiService.verifyRecaptchaV3(token)
      .subscribe(response => {
        console.log('Server response:', response);
      });
  }
}
