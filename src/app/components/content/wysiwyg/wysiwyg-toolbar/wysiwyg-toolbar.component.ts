import {Component, ViewChild, ElementRef} from '@angular/core';
import {WorkspaceService} from '../../../../services/workspace.service';

@Component({
  selector: 'app-wysiwyg-toolbar',
  templateUrl: './wysiwyg-toolbar.component.html',
  styleUrls: ['./wysiwyg-toolbar.component.scss']
})
export class WysiwygToolbarComponent  {

  foregroundColor = '#00000';

  @ViewChild('foregroundColorPicker')
  private foregroundColorPicker: ElementRef;

  constructor(private _workspaceService: WorkspaceService) { }

  launchAction(action: string) {
    this._workspaceService.launchAction(action);
  }

  openColorPicker() {
    this.foregroundColorPicker.nativeElement.click();
  }

  changeForeColor() {
    this._workspaceService.launchAction(`foreColor-${this.foregroundColor}`);
  }

  openImageChooser(files) {

    if (files && files[0]) {
      const reader = new FileReader();
      const ws = this._workspaceService;

      reader.onload = function (e) {
        ws.launchAction(`insertimage-${reader.result}`);
      };
      reader.readAsDataURL(files[0]);
    }
  }

}
