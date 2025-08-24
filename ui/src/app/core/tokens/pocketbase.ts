import { InjectionToken } from '@angular/core';
import pocketbase from 'pocketbase';

export const POCKETBASE = new InjectionToken('PocketBase instance', {
  providedIn: 'root',
  factory: () => {
    return new pocketbase('http://127.0.0.1:8090');
  },
});
