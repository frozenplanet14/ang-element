import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { PopupComponent } from '../popup/popup.component';

// declare global {
//   interface HTMLElementTagNameMap {
//     'ang-popup': NgElement & WithProperties<PopupComponent>;
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  // custom element implementation
  showAsElement(message: string) {
    // create element
    const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement('ang-popup') as any;

    // Listen to the close event
    popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));

    // set the message
    popupEl.message = message;

    // Add to the DOM
    document.body.appendChild(popupEl);
  }
}
