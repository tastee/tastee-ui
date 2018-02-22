import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {Workspace} from '../../models/workspace';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnChanges {

  @Input() public workspace: Workspace;
  menuSelected = 'home';

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void  {
    if (this.workspace && this.workspace.menu) {
      this.menuSelected = this.workspace.menu;
    }
  }
}
