import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';

@Component({
  selector: 'app-tastee-toolbar',
  templateUrl: './tastee-toolbar.component.html'
})
export class TasteeToolbarComponent implements OnInit  {

  isbrowserLaunched = false;

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit(){
    this._workspaceService.onAction().subscribe(action => {
      if(action === 'stopTastee'){
        this.isbrowserLaunched = false;
      }
    })
  }

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
