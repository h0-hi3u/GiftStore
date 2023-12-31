// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private triggerFunctionSubject = new Subject<void>();

  triggerFunction$ = this.triggerFunctionSubject.asObservable();

  triggerFunction(data: any) {
    this.triggerFunctionSubject.next(data);
  }
}
