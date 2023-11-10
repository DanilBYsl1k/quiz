import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

interface Form {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup<Form>;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.form= this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    }) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSubmit(): void {
    const value = this.form.value

    if(this.form.valid) {
      this.subscription= this.authService.login(value).subscribe(() => {
        this.router.navigate(['/dashboard'])
      })
    }
  }
}
