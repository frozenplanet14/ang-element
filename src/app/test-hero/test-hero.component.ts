import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'ang-test-hero',
  templateUrl: './test-hero.component.html',
  styleUrls: ['./test-hero.component.scss']
})
export class TestHeroComponent implements OnInit {
  @ViewChild('ref', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver, private injector: Injector) { }

  ngOnInit(): void {
  }

  async onLoad() {
    const { HomeComponent } = await import('security-app');
    this.container.createComponent(
      this.cfr.resolveComponentFactory(HomeComponent)
    );
  }

  // private async loadModuleFactory(t: any) {
  //   if (t instanceof NgModuleFactory) {
  //     return t;
  //   } else {
  //     return await this.compiler.compileModuleAsync(t);
  //   }
  // }

}
