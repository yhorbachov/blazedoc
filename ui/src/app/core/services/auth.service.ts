import { inject, Injectable } from '@angular/core';
import { from, ReplaySubject, tap } from 'rxjs';

import { POCKETBASE } from '../tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #pb = inject(POCKETBASE);

  authenticated$ = new ReplaySubject<boolean>(1);

  constructor() {
    if (this.#pb.authStore.isValid) {
      this.#pb
        .collection('users')
        .authRefresh()
        .then(
          () => this.authenticated$.next(true),
          () => this.authenticated$.next(false)
        );
    } else {
      this.authenticated$.next(false);
    }
  }

  signIn(credentials: { email: string; password: string }) {
    return from(
      this.#pb.collection('users').authWithPassword(credentials.email, credentials.password)
    ).pipe(tap(() => this.authenticated$.next(true)));
  }

  async logout() {
    this.#pb.authStore.clear();
    this.authenticated$.next(false);
  }
}
