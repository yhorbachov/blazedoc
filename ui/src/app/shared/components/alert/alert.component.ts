import { Component, computed, input } from '@angular/core';

type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  template: `
    <div role="alert" class="alert" [class]="alertClass()">
      <i class="ri-error-warning-line text-xl"></i>
      <span><ng-content /></span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class AlertComponent {
  type = input<AlertType>('default');
  protected alertClass = computed(() => `alert-${this.type()}`);
}
