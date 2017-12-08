import { Component, OnDestroy } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { Workspace } from 'app/models/workspace';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss'],
  providers: [FileService]
})
export class ContentFileComponent implements OnDestroy {

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) {
    if (workspaceService.getWorkspace().displayedFile) {
      this.openFile(workspaceService.getWorkspace());
    }
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => this.openFile(workspace));
  }

  public file: File;
  public data: String;
  private subWorkspaceUpdated: Subscription;

  ngOnInit() {
  }

  openFile(workspace: Workspace) {
    if (workspace.displayedFile) {
      this.file = new File(workspace.displayedFile.path, workspace.displayedFile.name, workspace.displayedFile.type);
      if (workspace.selectedFileInTree) {
        console.log(workspace.selectedFileInTree);
        this.file.directory = this.fileService.getParentDirectory(workspace.selectedFileInTree);
      } else {
        this.file.directory = workspace.treeDisplayed.path;
      }
      if (this.file.path) {
        this.file.data = this.fileService.readFile(this.file.path.toString());
      }
    } else {
      this.file = null;
    }
  }
  saveData() {
    if (this.file.path) {
      this.fileService.saveFile(this.file);
    }
  }

  displayActionsIfTasteeFile(): boolean {
    if (this.file.path) {
      return this.fileService.isTasteeFile(this.file.name.toString());
    }
    return false;
  }

  saveFile() {
    this.file = this.fileService.saveFile(this.file);
    let workspace = this.workspaceService.getWorkspace();
    workspace.displayedFile = this.file;
    workspace.selectedFileInTree = this.file;
    let idx = workspace.openedFiles.findIndex(file => !file.path);
    workspace.openedFiles[idx] = this.file;
    this.workspaceService.updateWorkspace(workspace);
  }

  deleteFile() {
    this.fileService.deleteFile(this.file);
    let workspace = this.workspaceService.removeFileInWorkspace(this.file);
    this.workspaceService.updateWorkspace(workspace);
  }

  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }
}
