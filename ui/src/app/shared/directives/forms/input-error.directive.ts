import {
  DestroyRef,
  Directive,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective } from '@angular/forms';

/**
 * Renders component when connected form control is touched and has errors
 */
@Directive({
  selector: '[inputError]',
})
export class InputError implements OnInit {
  inputErrorFrom = input.required<string>();

  private destroyRef = inject(DestroyRef);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private parent = inject(FormGroupDirective);

  ngOnInit(): void {
    const control = this.parent.control.get(this.inputErrorFrom());
    if (!control) throw `Cannot find form control: ${this.inputErrorFrom()}`;

    control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.viewContainerRef.clear();
      if (control.touched && control.errors) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: Object.keys(control.errors)[0],
        });
      }
    });
  }
}
