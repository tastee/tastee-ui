import {Component, EventEmitter, Input, Output} from '@angular/core';
import {File} from 'app/models/file';

@Component({
  selector: 'app-tastee-file',
  templateUrl: './tastee-file.component.html',
  styleUrls: ['./tastee-file.component.scss']
})
export class TasteeFileComponent {

  @Input() file: File;
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  saveData(event) {
    this.onChange.emit(event);
  }
}
