// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private triggerFunctionSubject = new Subject<void>();
  triggerFunction$ = this.triggerFunctionSubject.asObservable();

  private triggerFunctionChangNumberSubject = new Subject<void>();
  triggerFunctionChangNumber$ = this.triggerFunctionChangNumberSubject.asObservable();
  triggerFunction(data: any) {
    this.triggerFunctionSubject.next(data);
  }
  triggerFunctionChangNumber(data: any) {
    this.triggerFunctionChangNumberSubject.next(data);
  }
}
