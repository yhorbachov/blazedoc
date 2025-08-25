import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Sidebar } from './sidebar.component';
import { filter, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  imports: [RouterOutlet, Sidebar],
})
export class SidebarLayout implements OnInit {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #destroyRef = inject(DestroyRef);
  title = signal('');

  ngOnInit() {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.#setTitle());
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
