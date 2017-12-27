import {Component, Input} from '@angular/core';
import {WorkspaceService} from 'app/services/workspace.service';
import {FileService} from 'app/services/file.service';
import {Workspace} from 'app/models/workspace';
import {OnChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import {SimpleChange} from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnChanges {

  public tree: any;

  @Input() public workspace: Workspace;
  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
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
