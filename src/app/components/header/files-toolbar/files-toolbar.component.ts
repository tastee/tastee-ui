import {Component, Input, OnInit} from '@angular/core';
import {Workspace} from 'app/models/workspace';
import {WorkspaceService} from 'app/services/workspace.service';
import {File} from 'app/models/file';
import {FileService} from 'app/services/file.service';

@Component({
  selector: 'app-files-toolbar',
  templateUrl: './files-toolbar.component.html',
  styleUrls: ['./files-toolbar.component.scss']
})
export class FilesToolbarComponent implements OnInit {

  @Input() private workspace: Workspace;
  private _displayForm: Boolean = false;
  private _file: File;
  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) {
    this._file = new File();
  }

  ngOnInit() {
  }

  createNewFile(typeOfFile: string) {
    this._file.type = typeOfFile;
    if (this.workspace.selectedFileInTree.type === 'directory') {
      this._file.path = this.workspace.selectedFileInTree.path;
    } else {
      this._file.path = this.fileService.getParentDirectory(this.workspace.selectedFileInTree);
    }
    this.fileService.createFile(this._file)
    this.workspaceService.updateWorkspace(Workspace.copy(this.workspace));
  }

  updateTreeInWorkspace() {
    const ws = Workspace.copy(this.workspaceService.getWorkspace());
    this.workspaceService.updateWorkspace(ws);
  }

  deleteFile() {
    this.fileService.deleteFile(this.workspace.selectedFileInTree);
  }
}
