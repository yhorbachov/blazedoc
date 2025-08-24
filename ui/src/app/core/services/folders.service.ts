import { inject, Injectable } from '@angular/core';

import { POCKETBASE } from '../tokens';

@Injectable({ providedIn: 'root' })
export class FoldersService {
  #pb = inject(POCKETBASE);

  async all() {
    return this.#pb.collection('folders').getList();
  }
}
