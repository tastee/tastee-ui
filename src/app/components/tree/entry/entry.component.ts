import { Component, OnDestroy, Input } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { File } from 'app/models/file';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnDestroy, OnInit {

  @Input() child: any;
  @Input() openSubTree: Boolean = false;

  private subWorkspaceUpdated: Subscription;

  public childIsSelected: Boolean = false;
  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) {
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => {
      if (workspace.selectedFileInTree && this.child.path === workspace.selectedFileInTree.path) {
        this.childIsSelected = true;
      } else {
        this.childIsSelected = false;
      }
    })
  }
  ngOnInit() {
    const workspace = this.workspaceService.getWorkspace();
    if (workspace.selectedFileInTree) {
      if (workspace.selectedFileInTree && this.child.path === workspace.selectedFileInTree.path) {
        this.childIsSelected = true;
      } else {
        this.childIsSelected = false;
      }
    }
  }

  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }

  selectedTreeFile(file: File) {
    const workspace = this.workspaceService.getWorkspace();
    workspace.selectedFileInTree = file;
    this.workspaceService.updateWorkspace(workspace);
  }

  displayFileInWorkspace(file: File) {
    const workspace = this.workspaceService.getWorkspace();
    workspace.displayedFile = file;
    if (workspace.openedFiles.filter(pathInArray => pathInArray.path === file.path).length === 0) {
      workspace.openedFiles.push(file);
    }
    this.workspaceService.updateWorkspace(workspace);
  }

  isCodeFile() {
    return this.fileService.isTasteeFile(this.child);
  }

  isYamlFile() {
    return this.fileService.isConfigFile(this.child);
  }
}
