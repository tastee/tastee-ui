import { Component, Input, Output } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { Workspace } from 'app/models/workspace';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  public tree: any;

  @Input() public workspace: Workspace;
  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) {
  }

  ngOnInit() {
    this.workspace.treeDisplayed = this.fileService.getFilesInWorkspace(this.workspace);
    if (JSON.stringify(this.tree) !== JSON.stringify(this.workspace.treeDisplayed)) {
      if (!this.workspace.treeDisplayed) {
        this.getFilesFromFs();
      } else {
        this.tree = this.workspace.treeDisplayed;
      }
    }
    this.getFilesFromFs();
  }

  getFilesFromFs() {
    this.workspace.treeDisplayed = this.fileService.getFilesInWorkspace(this.workspace);
    this.workspaceService.updateWorkspace(this.workspace);
  }
}
