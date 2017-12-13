import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html'
})
export class ResultToolbarComponent  {

  @Input() message: string;

  constructor() { }

}
