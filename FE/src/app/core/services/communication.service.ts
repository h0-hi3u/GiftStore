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

  private triggerFunctionChangNumberSubject = new Subject<void>();
  triggerFunctionChangNumber$ = this.triggerFunctionChangNumberSubject.asObservable();
  triggerFunctionChangNumber(data: any) {
    this.triggerFunctionChangNumberSubject.next(data);
  }

  private triggerDecreaseCartSubject = new Subject<void>();
  triggerDecreaseCart$ = this.triggerDecreaseCartSubject.asObservable();
  triggerDecreaseCart(data: any) {
    this.triggerDecreaseCartSubject.next(data);
  }

  private triggerIncreaseCartSubject = new Subject<void>();
  triggerIncreaseCart$ = this.triggerIncreaseCartSubject.asObservable();
  triggerIncreaseCart(data: any) {
    this.triggerIncreaseCartSubject.next(data);
  }

  private triggerRemoveFromCartSubject = new Subject<void>();
  triggerRemoveFromCart$ = this.triggerRemoveFromCartSubject.asObservable();
  triggerRemoveFromCart(data: any) {
    this.triggerRemoveFromCartSubject.next(data);
  }

  private triggerChangeQuantitySubject = new Subject<void>();
  triggerChangeQuantity$ = this.triggerChangeQuantitySubject.asObservable();
  triggerChangeQuantity(data: any) {
    this.triggerChangeQuantitySubject.next(data);
  }
}
