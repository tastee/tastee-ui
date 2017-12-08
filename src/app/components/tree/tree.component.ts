import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Workspace } from 'app/models/workspace';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [FileService]
})
export class TreeComponent implements OnInit, OnDestroy {

  public tree: any;
  private subWorkspaceUpdated: Subscription;

  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) {
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => {
      if (JSON.stringify(this.tree) !== JSON.stringify(workspace.treeDisplayed)) {
        if (!workspace.treeDisplayed) {
          this.getFilesFromFs();
        } else {
          this.tree = workspace.treeDisplayed;
        }
      }
    });
    this.getFilesFromFs();
  }

  ngOnInit() {

  }

  getFilesFromFs() {
    let workspace = this.workspaceService.getWorkspace();
    let tree = this.fileService.getFilesInWorkspace(workspace);
    workspace.treeDisplayed = tree;
    this.workspaceService.updateWorkspace(workspace);
  }
  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }
}
