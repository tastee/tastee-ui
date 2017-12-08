import { Component, OnInit } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnInit {

  private subChangedWorkspace: Subscription;
  private subTreeActionEvent: Subscription;
  public workspaceIsSelected: boolean = false;
  public displayTreeAction: boolean = false;
  constructor(
    private tasteeService: TasteeService,
    private fileService: FileService,
    private workspaceService: WorkspaceService) {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    this.subChangedWorkspace = this.workspaceService.obsChangedWorkspace().subscribe(workspace => this.workspaceIsSelected = workspace !== null);
    this.subTreeActionEvent = this.workspaceService.obsSelectedTreeFile().subscribe(file => this.displayTreeAction = true);
  }

  ngOnInit() {
  }

  runTastee() {
    this.tasteeService.runTastee(this.workspaceService.getWorkspace());
  }

  stopTastee() {
    this.tasteeService.stopTastee();
  }

  openWorkspace(files: FileList) {
    this.workspaceService.createNewWorkspace(files[0].path);
    this.workspaceService.updateTreeInWorkspace();
  }

  saveWorkspace() {
    this.workspaceService.saveWorkspace();
  }
  ngOnDestroy() {
    this.subChangedWorkspace.unsubscribe();
    this.subTreeActionEvent.unsubscribe();
  }
  deleteSelectedTreeFile() {
    let fileToDelete = this.workspaceService.getWorkspace().selectedFileInTree;
    this.fileService.deleteFile(fileToDelete);
    this.workspaceService.deleteFileInWorkspace(fileToDelete);
  }

  updateTreeInWorkspace() {
    this.workspaceService.updateTreeInWorkspace();
  }
}
