import { Component } from '@angular/core';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'ang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public popup: PopupService) { }
}
