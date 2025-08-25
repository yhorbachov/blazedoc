import { Component, input } from '@angular/core';

import { EmptyLayout } from './empty/empty-layout.component';
import { SidebarLayout } from './sidebar/sidebar-layout.component';

export enum Layout {
  empty = 'empty',
  sidebar = 'sidebar',
}

@Component({
  selector: 'layout',
  imports: [EmptyLayout, SidebarLayout],
  template: `
    @switch (layout()) { @case (layouts.empty) {
    <empty-layout />
    } @case (layouts.sidebar) {
    <sidebar-layout />
    } @default {
    <div class="w-screen h-screen flex items-center justify-center p-4">
      <div role="alert" class="alert alert-error w-full max-w-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! No layout provided.</span>
      </div>
    </div>
    } }
  `,
})
export class LayoutComponent {
  layouts = Layout;
  layout = input<Layout>();
}
