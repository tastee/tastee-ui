import { Component, OnInit, Input } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { Router } from '@angular/router';
import { File } from 'app/models/file';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnInit {

  private subWorkspaceUpdated: Subscription;

  @Input() public workspace: Workspace;

  public workspaceIsSelected: Boolean = false;
  public displayTreeAction: Boolean = false;

  constructor(
    private tasteeService: TasteeService,
    private fileService: FileService,
    private workspaceService: WorkspaceService,
    private router: Router) {
  }

  ngOnInit() {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    this.workspaceIsSelected = this.workspace !== null;
    if (this.workspace && this.workspace.selectedFileInTree) {
      this.displayTreeAction = true
    }
  }

  runTastee() {
    this.tasteeService.runTasteeInWorkspace(this.workspaceService.getWorkspace()).then(result => this.tasteeService.stopTastee());
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
