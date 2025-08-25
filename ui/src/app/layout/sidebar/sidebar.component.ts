import { Component, inject } from '@angular/core';
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
    this.#router.navigateByUrl('/auth');
  }
}
