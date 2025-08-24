import { computed, inject, Injectable, signal } from '@angular/core';

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
    this.#pb
      .collection('users')
      .authRefresh()
      .catch(() => this.logout());
  }

  async login(credentials: { email: string; password: string }) {
    await this.#pb.collection('users').authWithPassword(credentials.email, credentials.password);
  }

  async logout() {
    this.#pb.authStore.clear();
    this.#router.navigateByUrl('/auth');
  }
}
