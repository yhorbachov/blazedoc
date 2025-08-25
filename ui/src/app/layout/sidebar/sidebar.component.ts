import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class Sidebar {
  #auth = inject(AuthService);
  #router = inject(Router);

  logout() {
    this.#auth.logout();
  }
}
