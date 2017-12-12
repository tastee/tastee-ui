import { Component, OnChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { WorkspaceService } from 'app/services/workspace.service';
import { File } from 'app/models/file';
import { Workspace } from 'app/models/workspace';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-home',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnChanges {

  public files: Array<File> = [];

  @Input() public workspace: Workspace;

  constructor(private workspaceService: WorkspaceService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.files = this.workspace.openedFiles;
  }
  removeFile(file) {
    const workspace = this.workspaceService.removeFileInWorkspace(file);
    this.workspaceService.updateWorkspace(workspace);
  }

  activeThisTab(file) {
    if (this.workspace.displayedFile) {
      return file.path === this.workspace.displayedFile.path;
    }
    return false;
  }

  selectFile(file) {
    const workspace = Workspace.copy(this.workspace);
    if (file.path) {
      workspace.selectedFileInTree = file;
    }
    workspace.displayedFile = file;
    this.workspaceService.updateWorkspace(workspace);
  }

}
