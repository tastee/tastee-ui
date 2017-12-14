import {Component, Input} from '@angular/core';
import {Workspace} from 'app/models/workspace';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import {SimpleChange} from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnChanges {

  @Input() public workspace: Workspace;
  public menuSelected: string = 'home';

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.workspace && this.workspace.menu) {
      this.menuSelected = this.workspace.menu;
    }
  }

}
