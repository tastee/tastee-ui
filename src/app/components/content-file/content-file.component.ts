import { Component, Input, OnChanges } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { Workspace } from 'app/models/workspace';
import { TasteeService } from 'app/services/tastee.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss']
})
export class ContentFileComponent implements OnChanges {

  @Input() public workspace: Workspace;


  public file: File;

  private _isTasteeFile: Boolean = false;
  private _isYamlFile: Boolean = false;
  private _isPropertiesFile: Boolean = false;
  private _isOtherFile: Boolean = false;
  private _isbrowserLaunched: Boolean = false;

  constructor(private _workspaceService: WorkspaceService,
    private _fileService: FileService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this._openFile(this.workspace);
    this._workspaceService.onAction().subscribe(action => this._execute(action))
  }

  _openFile(workspace: Workspace) {
    if (workspace.displayedFile) {
      this.file = new File();
      this.file.path = workspace.displayedFile.path;
      this.file.name = workspace.displayedFile.name;
      this.file.type = workspace.displayedFile.type;
      this._isTasteeFile = this._fileService.isTasteeFile(this.file);
      this._isYamlFile = this._fileService.isConfigFile(this.file);
      this._isPropertiesFile = this._fileService.isPropertiesFile(this.file);
      this._isOtherFile = !this._isTasteeFile && !this._isYamlFile && !this._isPropertiesFile;
      if (this.file.path) {
        this.file.data = this._fileService.readFile(this.file.path.toString());
      }
    } else {
      this.file = null;
      this._isTasteeFile = false;
      this._isOtherFile = false;
      this._isYamlFile = false;
      this._isPropertiesFile = false;
    }
  }

  private _execute(role) {
    switch (role) {
      case 'startTastee':
        this._isbrowserLaunched = true;
        break;
      case 'stopTastee':
        this._isbrowserLaunched = false;
        this._workspaceService.addEvent(null);
        break;
      default:
        break;
    }
  }

}
