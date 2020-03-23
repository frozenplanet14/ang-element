import { Injectable, Compiler, Injector, NgModuleFactory, Type } from '@angular/core';

// https://juristr.com/blog/2019/04/state-lazy-loading-components-angular/

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  private componentRegistry = {
    'lib-lazy-list': {
      modulePath: () =>
        import('lazy-element').then(m => m.LazyElementModule),
      moduleRef: null
    }
  };

  constructor(private compiler: Compiler, private injector: Injector) { }

  loadComponent(componentTag: string): Promise<HTMLElement> {
    const cmpRegistryEntry = this.componentRegistry[componentTag];
    if (!cmpRegistryEntry) {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }

    // verifies whether the moduleRef property has a value. If that’s the case, the module has already
    // been instantiated, so we just need to create an instance of our Angular Element
    // using the native browser API and resolve the Promise.
    if (cmpRegistryEntry.moduleRef) {
      return new Promise(resolve => {
        const componentInstance = document.createElement(componentTag);
        resolve(componentInstance);
      });
    } else {
      // The module can directly be lazy loaded by invoking the dynamic import function that is stored
      // in the modulePath of our object. Once the module is loaded, we create it using moduleFactory.
      // create(...) passing it the injector. Finally, we again instantiate our Angular Element and
      //  return it (by resolving our Promise).
      const path = cmpRegistryEntry.modulePath;
      return new Promise((resolve, reject) => {
        (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then(elementModuleOrFactory => {
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              // if ViewEngine
              return elementModuleOrFactory;
            } else {
              try {
                // if Ivy
                return this.compiler.compileModuleAsync(elementModuleOrFactory);
              } catch (err) {
                throw err;
              }
            }
          })
          .then(moduleFactory => {
            const moduleRef = moduleFactory.create(this.injector).instance;
            cmpRegistryEntry.moduleRef = moduleRef;

            // instantiate the component
            const componentInstance = document.createElement(componentTag);
            resolve(componentInstance);
          })
          .catch(err => {
            console.error('error loading module', err);
            reject(err);
          });
      });
    }
  }
}
