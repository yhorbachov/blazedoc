import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs';

import { Sidebar } from './sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  imports: [RouterOutlet, Sidebar, FormsModule],
})
export class SidebarLayout implements OnInit {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);

  title = signal('');
  drawerOpen = signal(false);

  ngOnInit() {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => {
        this.#setTitle();
        this.drawerOpen.set(false);
      });
  }

  #setTitle() {
    let title = '';
    let route: ActivatedRoute | null = this.#activatedRoute;
    while (route) {
      title = route.snapshot.title ?? title;
      route = route.firstChild;
    }
    this.title.set(title);
  }
}
