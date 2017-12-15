import {Component} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';

@Component({
  selector: 'app-tastee-toolbar',
  templateUrl: './tastee-toolbar.component.html'
})
export class TasteeToolbarComponent  {

  isbrowserLaunched = false;

  constructor(private _workspaceService: WorkspaceService) { }

  launchTasteeAction(action: string) {
    switch (action) {
      case 'startTastee':
        if (!this.isbrowserLaunched) {
          this._workspaceService.launchAction(action);
          this.isbrowserLaunched = true;
        }
        break;
      case 'stopTastee':
        if (this.isbrowserLaunched) {
          this._workspaceService.launchAction(action);
          this.isbrowserLaunched = false;
        }
        break;
      default:
        this._workspaceService.launchAction(action);
        break;
    }
  }

}
