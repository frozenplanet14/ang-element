import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'lib-lazy-list',
  templateUrl: './lazy-list.component.html',
  styleUrls: ['./lazy-list.component.scss']
})
export class LazyListComponent implements OnInit, OnDestroy {
  @Input() users: any[];

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    console.log('User List component destroyed');
  }

}
