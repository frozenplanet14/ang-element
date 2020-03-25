import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { HeroLoaderModule } from '@herodevs/hero-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { QuizLoaderComponent } from './quiz-loader/quiz-loader.component';
import { LazyCompDirective } from './two-lazy/lazy-comp.directive';
import { TestHeroComponent } from './test-hero/test-hero.component';
import { setInjector } from 'lazy-element';

// import { setInjector } from 'lazy-element';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    QuizLoaderComponent,
    LazyCompDirective,
    TestHeroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // HeroLoaderModule
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    setInjector(injector);
    const popupElement = createCustomElement(PopupComponent, { injector: this.injector }) as any;
    customElements.define('ang-popup', popupElement);
  }
}
