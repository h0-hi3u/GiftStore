import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperReloadSearch {
  private reloadSubject = new Subject<void>();
  public searchText: string = "";
  // Observable to subscribe to reload events
  reload$ = this.reloadSubject.asObservable();

  // Method to trigger a reload
  triggerReload() {
    this.reloadSubject.next();
  }
}
