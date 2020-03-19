import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ang-popup',
  template: `
    <span>Popup: {{message}}</span>
    <button (click)="closed.next()">&#x2716;</button>
  `,
  animations: [
    trigger('state', [
      state('opened', style({ transform: 'translateY(0%)' })),
      state('void, closed', style({ transform: 'translateY(100%)', opacity: 0 })),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[@state]': 'state',
  },
  styles: [`
  :host {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #009cff;
      height: 48px;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid black;
      font-size: 24px;
    }

    button {
      border-radius: 50%;
    }
  `]
})
export class PopupComponent implements OnInit {
  state: 'opened' | 'closed' = 'closed';

  @Input()
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  get message(): string { return this._message; }
  // tslint:disable-next-line: variable-name
  _message: string;

  @Output() closed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
