import { Component, Input, OnChanges } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { Workspace } from '../../models/workspace';
import { FileService } from '../../services/file.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {
  @Input() public workspace: Workspace;

  public workspaceIsSelected = false;
  public displayTreeAction = false;
  public isEditingTastee = false;

  constructor(
    private fileService: FileService,
    private workspaceService: WorkspaceService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() !== null;
    if (this.workspace && this.workspace.selectedFileInTree) {
      this.displayTreeAction = true;
    }
    if (this.workspace && this.workspace.displayedFile) {
      this.isEditingTastee = this.fileService.isTasteeFile(this.workspace.displayedFile);
    } else {
      this.isEditingTastee = false;
    }
  }

  openWorkspace(files: FileList) {
    this.workspaceService.createNewWorkspace(files[0].path);
  }

  saveWorkspace() {
    this.workspaceService.saveWorkspace(this.workspaceService.getWorkspace());
  }

}
