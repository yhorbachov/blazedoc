import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/services';
import { AlertComponent } from '@shared/components/alert';
import { MarkOnError, InputError } from '@shared/directives/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, AlertComponent, MarkOnError, InputError, RouterLink],
})
export default class LoginComponent {
  #fb = inject(FormBuilder).nonNullable;
  #authService = inject(AuthService);
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  form = this.#fb.group({
    email: this.#fb.control('', [Validators.email, Validators.required]),
    password: this.#fb.control('', [Validators.required]),
  });
  error = signal(false);

  signIn() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.#authService
      .signIn(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => this.#router.navigateByUrl('/'),
        error: () => this.error.set(true),
      });
  }
}
