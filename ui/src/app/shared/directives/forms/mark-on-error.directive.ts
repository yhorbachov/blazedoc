import { DestroyRef, Directive, HostBinding, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlName } from '@angular/forms';

/**
 * Applies "input-error" class when form control is touched and invalid
 */
@Directive({
  selector: '[markOnError]',
})
export class MarkOnError implements OnInit {
  private formControlName = inject(FormControlName);
  private destroyRef = inject(DestroyRef);

  @HostBinding('class.input-error') hasError = false;

  ngOnInit(): void {
    this.formControlName.control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.hasError = this.formControlName.control.touched && this.formControlName.control.invalid;
    });
  }
}
