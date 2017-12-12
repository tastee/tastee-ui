import { Component, OnInit, Input } from '@angular/core';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-information-line-bar',
  templateUrl: './information-line-bar.component.html',
  styleUrls: ['./information-line-bar.component.scss']
})
export class InformationLineBarComponent implements OnChanges {

  @Input() private data: String;
  private _numbers: Number[] = [];
  constructor() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(this.data.toString());
    this._numbers = this.data.toString().split('\n').fill('').map((x, i) => i);
  }

}
