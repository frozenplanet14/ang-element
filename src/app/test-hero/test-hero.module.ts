import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestHeroComponent } from './test-hero/test-hero.component';



@NgModule({
  declarations: [TestHeroComponent],
  bootstrap: [TestHeroComponent],
  imports: [
    CommonModule
  ]
})
export class TestHeroModule { }
