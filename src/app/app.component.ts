import { Component, Type, Injector } from '@angular/core';
import { PopupService } from './services/popup.service';
import { OneLazyComponent as LazyOneComponent } from './one-lazy/one-lazy.component';

@Component({
  selector: 'ang-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  one: Promise<Type<LazyOneComponent>>;
  oneInjector: Injector;
  inputData = { dataObj: { id: 1, title: 'emoji' } };
  constructor(public popup: PopupService, private injector: Injector) { }

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
}
