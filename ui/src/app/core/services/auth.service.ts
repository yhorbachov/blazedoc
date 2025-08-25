import { computed, inject, Injectable, signal } from '@angular/core';
import { delay, from } from 'rxjs';

import { POCKETBASE } from '../tokens';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #pb = inject(POCKETBASE);
  #authStore = signal(this.#pb.authStore);
  #router = inject(Router);

  authenticated = computed(() => this.#authStore().isValid);

  constructor() {
    this.#pb.authStore.onChange(() => this.#authStore.set(this.#pb.authStore));
    if (this.#pb.authStore.isValid) {
      this.#pb
        .collection('users')
        .authRefresh()
        .catch(() => this.logout());
    }
  }

  signIn(credentials: { email: string; password: string }) {
    return from(
      this.#pb.collection('users').authWithPassword(credentials.email, credentials.password)
    ).pipe(
      // Need to delay because authStore.onChange emmits in next tick
      delay(0)
    );
  }

  async logout() {
    this.#pb.authStore.clear();
    this.#router.navigateByUrl('/auth');
  }
}
