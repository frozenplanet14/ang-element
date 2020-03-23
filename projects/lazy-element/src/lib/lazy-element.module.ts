import { NgModule, Injector } from '@angular/core';
import { LazyElementComponent } from './lazy-element.component';
import { LazyListComponent } from './lazy-list/lazy-list.component';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { createCustomElement } from '@angular/elements';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LazyElementComponent, LazyListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  exports: [LazyElementComponent]
})
export class LazyElementModule {
  constructor(injector: Injector) {
    const el = createCustomElement(LazyListComponent, { injector });
    customElements.define('lib-lazy-list', el as any);
  }
}
