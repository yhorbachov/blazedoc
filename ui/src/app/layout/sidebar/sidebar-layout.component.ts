import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from './sidebar.component';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  imports: [RouterOutlet, Sidebar],
})
export class SidebarLayout {}
