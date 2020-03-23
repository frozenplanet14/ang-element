import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-lazyElement',
  template: `
    <p>
      lazy-element works!
    </p>
  `,
  styles: []
})
export class LazyElementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
