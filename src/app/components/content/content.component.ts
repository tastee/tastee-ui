import {Component, Input, OnInit, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {Workspace} from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { WorkspaceService } from 'app/services/workspace.service';

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
