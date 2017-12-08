import { Component, OnInit } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnInit {

  private subWorkspaceUpdated: Subscription;


  public workspaceIsSelected: boolean = false;
  public displayTreeAction: boolean = false;
  constructor(
    private tasteeService: TasteeService,
    private fileService: FileService,
    private workspaceService: WorkspaceService,
    private router: Router) {
  }

  ngOnInit() {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => {
      this.workspaceIsSelected = workspace !== null;
      if (workspace.selectedFileInTree) {
        this.displayTreeAction = true
      }
    });
  }

  runTastee() {
    this.tasteeService.runTastee(this.workspaceService.getWorkspace());
  }

  stopTastee() {
    this.tasteeService.stopTastee();
  }

  openWorkspace(files: FileList) {
    this.workspaceService.createNewWorkspace(files[0].path);
    this.router.navigate(['files']);
  }

  saveWorkspace() {
    this.workspaceService.saveWorkspace(this.workspaceService.getWorkspace());
  }

  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }
  //deleteSelectedTreeFile() {
  //  let fileToDelete = this.workspaceService.getWorkspace().selectedFileInTree;
  //  this.fileService.deleteFile(fileToDelete);
  //  this.workspaceService.deleteFileInWorkspace(fileToDelete);
  //}

  updateTreeInWorkspace() {
    this.workspaceService.updateWorkspace(this.workspaceService.getWorkspace());
  }
}
