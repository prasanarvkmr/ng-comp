import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-recaptcha-v2',
  imports: [FormsModule, RecaptchaModule, ReactiveFormsModule],
  templateUrl: './recaptcha-v2.component.html',
  styleUrl: './recaptcha-v2.component.css'
})

export class RecaptchaV2Component {
  form: FormGroup;
  http: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.form = this.fb.group({
      recaptcha: ['']
    });
  }

  onSubmit() {
    const token = this.form.get('recaptcha')?.value;
    this.verifyToken(token);
  }

  verifyToken(token: string) {
    this.apiService.verifyRecaptcha(token)
      .subscribe(response => {
        console.log('Server response:', response);
      });
  }

  onResolved(token: string) {
    this.form.get('recaptcha')?.setValue(token);
  }
}

