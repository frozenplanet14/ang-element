import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DynamicElement } from '../lazy-loader.decorator';

@Component({
  selector: 'lib-lazy-list',
  templateUrl: './lazy-list.component.html',
  styleUrls: ['./lazy-list.component.scss']
})
@DynamicElement('lib-lazy-list')
export class LazyListComponent implements OnInit, OnDestroy {
  @Input() users: any[];

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    console.log('User List component destroyed');
  }

}
