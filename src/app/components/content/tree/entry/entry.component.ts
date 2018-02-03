import { Component, Input } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { File } from 'app/models/file';
import { FileService } from 'app/services/file.service';
import { Workspace } from 'app/models/workspace';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnChanges {

  @Input() child: any;
  @Input() openSubTree: Boolean = false;

  @Input() public workspace: Workspace;

  public childIsSelected: Boolean = false;

  constructor(private workspaceService: WorkspaceService, private fileService: FileService) { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.workspace && this.workspace.selectedFileInTree) {
      if (this.workspace.selectedFileInTree && this.child.path === this.workspace.selectedFileInTree.path) {
        this.childIsSelected = true;
      } else {
        this.childIsSelected = false;
      }
    }
  }

  selectedTreeFile(file: File) {
    const ws = Workspace.copy(this.workspace);
    ws.selectedFileInTree = file;
    this.workspaceService.updateWorkspace(ws);
    this.openSubTree = !this.openSubTree;
  }

  selectedTreeFolder(file: File) {
    const ws = Workspace.copy(this.workspace);
    ws.selectedFileInTree = file;
    if (ws.openedFolders.filter(folder => folder.path === file.path).length === 0) {
      ws.openedFolders.push(file);
    } else {
      ws.openedFolders.splice(ws.openedFolders.findIndex(folder => folder.path === file.path), 1);
    }
    this.workspaceService.updateWorkspace(ws);
    this.openSubTree = !this.openSubTree;
  }

  folderIsOpen(file: File) {
    if (this.workspace.openedFolders) {
      return this.workspace.openedFolders.filter(folder => folder.path === file.path).length > 0;
    }
    return false;
  }

  displayFileInWorkspace(file: File) {
    const ws = Workspace.copy(this.workspace);
    ws.displayedFile = file;
    this.workspaceService.updateWorkspace(ws);
  }

  isCodeFile() {
    return this.fileService.isTasteeFile(this.child);
  }

  isYamlFile() {
    return this.fileService.isConfigFile(this.child);
  }

  isPropertiesFile() {
    return this.fileService.isPropertiesFile(this.child);
  }
}
