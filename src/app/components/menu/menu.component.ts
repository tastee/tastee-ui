import {Component, Input} from '@angular/core';
import {Workspace} from '../../models/workspace';
import {WorkspaceService} from '../../services/workspace.service';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import {SimpleChange} from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnChanges {

  public menuSelected: string = 'home';

  @Input() public workspace: Workspace;

  constructor(private workspaceService: WorkspaceService) { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.workspace && this.workspace.menu) {
      this.menuSelected = this.workspace.menu;
    }
  }

  goto(name: string) {
    const ws = Workspace.copy(this.workspace);
    ws.menu = name;
    this.workspaceService.updateWorkspace(ws);
  }

}
