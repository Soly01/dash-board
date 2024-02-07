import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardCreatedSource = new Subject<void>();

  cardCreated$ = this.cardCreatedSource.asObservable();

  triggerCardCreation() {
    this.cardCreatedSource.next();
  }

  constructor() {}
}
