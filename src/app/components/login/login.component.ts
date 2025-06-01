import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      company: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    this.loginError = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password, company } = this.loginForm.value;

    setTimeout(() => {  
      const success = this.authService.login(email, password, company);
      this.isLoading = false;
      if (success) {
        this.router.navigate(['/users']);
      } else {
        this.loginError = 'Invalid credentials. Please try again.';
      }
    }, 1000);
  }
}
