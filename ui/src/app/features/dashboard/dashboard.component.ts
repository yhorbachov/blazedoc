import { Component, inject, OnInit } from '@angular/core';
import { FoldersService } from '@core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent implements OnInit {
  #foldersService = inject(FoldersService);

  async ngOnInit() {
    const folders = await this.#foldersService.all();

    console.log('Folders', folders);
  }
}
