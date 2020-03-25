import { Component, Type, Injector, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupService } from './services/popup.service';
import { OneLazyComponent as LazyOneComponent } from './one-lazy/one-lazy.component';
import { ComponentLoaderService } from './services/component-loader.service';

@Component({
  selector: 'ang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  one: Promise<Type<LazyOneComponent>>;
  oneInjector: Injector;
  inputData = { dataObj: { id: 1, title: 'emoji' } };
  @ViewChild('userContainer', { static: true }) userContainer: ElementRef;
  constructor(
    public popup: PopupService,
    private injector: Injector,
    private componentLoader: ComponentLoaderService) { }

  loadOne() {
    if (!this.one) {
      this.oneInjector = Injector.create({
        providers: [{
          provide: 'oneData',
          useValue: this.inputData.dataObj
        }],
        parent: this.injector
      });

      this.one = import(`./one-lazy/one-lazy.component`)
        .then(({ OneLazyComponent }) => OneLazyComponent);
    }
  }

  onLoadUsers() {
    this.componentLoader.loadComponent('lib-lazy-list').then(componentEl => {
      // tslint:disable-next-line: no-string-literal
      componentEl['users'] = [
        {
          name: 'Juri'
        },
        {
          name: 'Steffi'
        }
      ];
      console.log(componentEl);
      this.userContainer.nativeElement
        .appendChild(componentEl);
    });
  }
}
