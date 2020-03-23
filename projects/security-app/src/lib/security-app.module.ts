import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { EditorRoutingModule } from './lib-routing.module';


@NgModule({
  declarations: [QuillEditorComponent, HomeComponent],
  imports: [
    CommonModule, FormsModule, MatTabsModule, EditorRoutingModule
  ],
  exports: [QuillEditorComponent, HomeComponent]
})
export class SecurityAppModule { }
