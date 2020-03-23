import { Component, OnInit, Inject, Optional } from '@angular/core';

// https://netbasal.com/welcome-to-the-ivy-league-lazy-loading-components-in-angular-v9-e76f0ee2854a

@Component({
  selector: 'ang-one-lazy',
  templateUrl: './one-lazy.component.html',
  styleUrls: ['./one-lazy.component.scss']
})
export class OneLazyComponent implements OnInit {
  // Limitation importing modules
  dataObj: any;

  constructor(@Optional() @Inject('oneData') data) {
    this.dataObj = data;
  }

  ngOnInit(): void {
  }

}
