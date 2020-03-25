import { createCustomElement } from '@angular/elements';
import { Injector } from '@angular/core';
import { Observable, interval } from 'rxjs';

let AppInjector: Injector;

export const setInjector = (inj: Injector) => {
  AppInjector = inj;
};

export function DynamicElement(pageName: string): ClassDecorator {
  console.log(AppInjector);
  // tslint:disable-next-line: only-arrow-functions
  return (constructor: any) => {
    waitForInjector().subscribe(() => {
      const el = createCustomElement(constructor, { injector: AppInjector });
      customElements.define(pageName, el as any);
    });
  };

  function waitForInjector(): Observable<any> {
    return new Observable(sub => {
      const waitIntervalMs = 100;
      let checkPass = 0;
      const maxTries = 20;
      interval(waitIntervalMs).subscribe(() => {
        if (AppInjector) {
          sub.next();
          sub.complete();
        } else if (checkPass < maxTries) {
          checkPass++;
        } else {
          sub.error();
        }
      });
    });
  }
}
