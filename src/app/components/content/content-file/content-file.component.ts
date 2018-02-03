import {Component, OnInit} from '@angular/core';
import {FileService} from 'app/services/file.service';
import {File} from 'app/models/file';
import {Workspace} from 'app/models/workspace';
import {WorkspaceService} from '../../../services/workspace.service';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss']
})
export class ContentFileComponent implements OnInit {

  workspace: Workspace;

  file: File;

  private _isTasteeFile = false;
  private _isYamlFile = false;
  private _isPropertiesFile = false;
  private _isOtherFile = false;

  constructor(private _fileService: FileService, private _workspaceService: WorkspaceService) {
  }

  ngOnInit() {
    this._workspaceService.workspaceUpdated().subscribe(workspace => {
      this.workspace = workspace;
      this._openFile();
    });
  }

  saveData(event) {
    if (this.file.path) {
      this._fileService.saveFile(this.file, event);
    }
  }

  _openFile() {
    if (this.workspace.displayedFile) {
      this.file = new File();
      this.file.path = this.workspace.displayedFile.path;
      this.file.name = this.workspace.displayedFile.name;
      this.file.type = this.workspace.displayedFile.type;
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

}
