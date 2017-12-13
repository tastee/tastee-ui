import { Component, Input, OnChanges } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Input() public workspace: Workspace;

  public _workspaceIsSelected: Boolean = false;
  public _displayTreeAction: Boolean = false;

  constructor(
    private fileService: FileService,
    private workspaceService: WorkspaceService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this._workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    if (this.workspace && this.workspace.selectedFileInTree) {
      this._displayTreeAction = true
    }
  }

  openWorkspace(files: FileList) {
    this.workspaceService.createNewWorkspace(files[0].path);
    this.updateTreeInWorkspace();
  }

  saveWorkspace() {
    this.workspaceService.saveWorkspace(this.workspaceService.getWorkspace());
  }

  createNewFileInWorkspace() {
    const workspace = this.workspaceService.getWorkspace();
    const idxNewFile = workspace.openedFiles.findIndex(file => !file.path);
    if (idxNewFile === -1) {
      const file = new File(null, 'New File', 'file');
      workspace.displayedFile = file;
      workspace.openedFiles.push(file);
    } else {
      workspace.displayedFile = workspace.openedFiles[idxNewFile];
    }
    this.workspaceService.updateWorkspace(workspace);
  }
  updateTreeInWorkspace() {
    const ws = Workspace.copy(this.workspaceService.getWorkspace());
    this.workspaceService.updateWorkspace(ws);
  }

  deleteFile() {
    this.fileService.deleteFile(this.workspace.selectedFileInTree);
    this.workspaceService.updateWorkspace(this.workspaceService.removeFileInWorkspace(this.workspace.selectedFileInTree));
  }
}
