import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { WorkspaceService } from 'app/services/workspace.service';
import { File } from 'app/models/file';

@Component({
  selector: 'app-home',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnDestroy {

  public files: Array<File> = [];
  private subWorkspaceUpdated: Subscription;

  constructor(private workspaceService: WorkspaceService) {
    this.workspaceService.getWorkspace().openedFiles.forEach(file => this.files.push(file));
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => {
      this.files = workspace.openedFiles;
    });
  }

  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }

  removeFile(file) {
    let workspace = this.workspaceService.removeFileInWorkspace(file);
    this.workspaceService.updateWorkspace(workspace);
  }

  activeThisTab(file) {
    if (this.workspaceService.getWorkspace().displayedFile) {
      return file.path === this.workspaceService.getWorkspace().displayedFile.path;
    }
    return false;
  }

  selectFile(file) {
    let workspace = this.workspaceService.getWorkspace();
    if (file.path) {
      workspace.selectedFileInTree = file;
    }
    workspace.displayedFile = file;
    this.workspaceService.updateWorkspace(workspace);
  }

}
