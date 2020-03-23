import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  html = '';
  html2 = '<h2>Hello</h2>';
  constructor() { }

  ngOnInit(): void {
  }

}
