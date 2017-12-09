import { Component, OnInit, Input } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {

  @Input() data: String;

  constructor() { }

  ngOnInit() {
  }
  formatWrite(role) {
    switch (role) {
      case 'h1':
      case 'h2':
      case 'pre':
      case 'p':
        document.execCommand('formatBlock', false, role);
        break;
      default:
        document.execCommand(role, false, null);
        break;
    }
  }

}
