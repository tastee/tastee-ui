import {Component} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';

@Component({
  selector: 'app-wysiwyg-toolbar',
  templateUrl: './wysiwyg-toolbar.component.html'
})
export class WysiwygToolbarComponent  {

  constructor(private _workspaceService: WorkspaceService) {
  }

  formatWrite(action: string) {
    this._workspaceService.launchWysiwygAction(action);
  }

}
