import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, NgZone, Inject } from '@angular/core';
import { QuillEditorService } from '../../public-api';
import { DOCUMENT } from '@angular/common';

// https://github.com/changhuixu/ngx-quill-lite
declare var Quill: any;


/**
 * An Angular library that lazy loads Quill JavaScript and its theme CSS.
 * Dependencies: @angular/common, @angular/core, @angular/forms, @angular/platform-browser;
 * Released assets from Quill.
 */
@Component({
  selector: 'lib-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit, OnDestroy {
  @Input() html = '';
  @Output() htmlChange = new EventEmitter<string>();
  quillEditor: any;
  private textChangeEvent: any;
  showEditor = false;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private readonly svc: QuillEditorService,
    @Inject(DOCUMENT) private readonly document: any
  ) { }

  ngOnInit() {
    this.svc.lazyLoadQuill().subscribe(_ => {
      if (!Quill) {
        Quill = this.document.defaultView.Quill;
      }
      this.setupQuill();
    });
  }

  setupQuill() {
    if (!Quill) {
      return;
    }
    // use generic align styles
    const align = Quill.import('attributors/style/align');
    align.whitelist = ['right', 'center', 'justify'];
    Quill.register(align, true);

    const toolbarElem = this.elementRef.nativeElement.querySelector(
      '[quill-editor-toolbar]'
    );
    const editorElem = this.elementRef.nativeElement.querySelector(
      '[quill-editor-container]'
    );
    this.quillEditor = new Quill(editorElem, {
      format: 'html',
      theme: 'snow',
      modules: {
        toolbar: toolbarElem
      }
    });

    const contents = this.quillEditor.clipboard.convert(this.html);
    this.quillEditor.setContents(contents, 'silent');
    this.quillEditor.history.clear();

    this.textChangeEvent = this.quillEditor.on(
      'text-change',
      (delta: any, oldDelta: any, source: string): void => {
        if (source === 'user') {
          let html: string | null = this.quillEditor.root.innerHTML;
          if (html === '<p><br></p>' || html === '<div><br><div>') {
            html = null;
          }
          this.zone.run(() => {
            this.htmlChange.emit(html);
          });
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.textChangeEvent) {
      this.textChangeEvent.removeListener('text-change');
    }
  }
}
