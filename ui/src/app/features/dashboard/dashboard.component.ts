import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FoldersService } from '@core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink],
})
export default class DashboardComponent implements OnInit {
  #foldersService = inject(FoldersService);

  async ngOnInit() {
    const folders = await this.#foldersService.all();

    console.log('Folders', folders);
  }
}
