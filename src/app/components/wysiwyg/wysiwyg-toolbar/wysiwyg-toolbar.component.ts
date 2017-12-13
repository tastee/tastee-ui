import {Component, Input} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';
import {TasteeService} from '../../../services/tastee.service';
import {Workspace} from '../../../models/workspace';

@Component({
  selector: 'app-wysiwyg-toolbar',
  templateUrl: './wysiwyg-toolbar.component.html'
})
export class WysiwygToolbarComponent  {

  constructor(private _workspaceService: WorkspaceService) { }

  launchAction(action: string) {
    this._workspaceService.launchWysiwygAction(action);
  }

}
