import { Component, OnChanges, Input } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnChanges {

  private subWorkspaceUpdated: Subscription;

  @Input() public workspace: Workspace;

  public _workspaceIsSelected: Boolean = false;
  public _tasteeFileIsDisplayed: Boolean = false;
  public _displayTreeAction: Boolean = false;

  constructor(
    private tasteeService: TasteeService,
    private fileService: FileService,
    private workspaceService: WorkspaceService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this._workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    this._tasteeFileIsDisplayed = this.workspace.displayedFile !== null && this.fileService.isTasteeFile(this.workspace.displayedFile);
    if (this.workspace && this.workspace.selectedFileInTree) {
      this._displayTreeAction = true
    }
  }

  runTastee() {
    this.tasteeService.runTastee(this.workspace.displayedFile).then(instructions => {
      console.log(instructions);
      this.tasteeService.stopTastee();
    })
  }

  stopTastee() {
    this.tasteeService.stopTastee();
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
    this.workspaceService.updateWorkspace(this.workspaceService.getWorkspace());
  }
}
