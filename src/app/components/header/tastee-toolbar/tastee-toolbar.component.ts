import {Component} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';

@Component({
  selector: 'app-tastee-toolbar',
  templateUrl: './tastee-toolbar.component.html'
})
export class TasteeToolbarComponent  {

  constructor(private _workspaceService: WorkspaceService) { }

  launchTasteeAction(action: string) {
    switch (action) {
      case 'startTastee':
        this._workspaceService.launchAction(action);
        break;
      case 'stopTastee':
        this._workspaceService.launchAction(action);
        break;
      default:
        this._workspaceService.launchAction(action);
        break;
    }
  }

}
