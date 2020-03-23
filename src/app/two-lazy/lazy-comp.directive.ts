import { Directive, OnDestroy, Input, Type, EventEmitter, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';

// https://gist.github.com/NetanelBasal/3d153881bef25bd89a4b12727e250d77

@Directive({
  selector: '[angLazyComp]'
})
export class LazyCompDirective implements OnDestroy {
  // tslint:disable-next-line: variable-name
  private _inputs: any;
  // tslint:disable-next-line: variable-name
  private _outputs: { [x: string]: any; };
  private subscription = new Subscription();

  @Input('angLazyComp') set comp(type: Type<any>) {
    // TODO: Support components replacment
    if (type) {
      const factory = this.resolver.resolveComponentFactory(type);
      this.compRef = this.vcr.createComponent(factory);
      this.refreshInputs(this._inputs);
      if (this._outputs) {
        Object.keys(this._outputs).forEach(output => {
          this.subscription.add((this.compRef.instance[output] as EventEmitter<any>).subscribe(this._outputs[output]));
        });
      }
    }
  }

  @Input() set inputs(data: any) {
    if (this.compRef) {
      this.refreshInputs(data);
      this.compRef.hostView.detectChanges();
    } else {
      this._inputs = data;
    }
  }

  @Input() set outputs(data: any) {
    this._outputs = data;
  }

  private compRef: ComponentRef<any>;

  constructor(private vcr: ViewContainerRef, private resolver: ComponentFactoryResolver) {
  }

  private refreshInputs(inputs: { [x: string]: any; }) {
    if (!inputs) {
      return;
    }
    Object.keys(inputs).forEach(inputName => this.compRef.instance[inputName] = inputs[inputName]);
  }

  ngOnDestroy() {
    this.compRef = null;
    this.subscription.unsubscribe();
  }
}
