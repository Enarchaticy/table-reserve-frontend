import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }
}
