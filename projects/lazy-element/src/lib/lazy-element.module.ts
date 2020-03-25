import { NgModule, Injector } from '@angular/core';
import { LazyListComponent } from './lazy-list/lazy-list.component';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [LazyListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  exports: []
})
export class LazyElementModule {
  // constructor(injector: Injector) {
  //   const el = createCustomElement(LazyListComponent, { injector });
  //   customElements.define('lib-lazy-list', el as any);
  // }
}
