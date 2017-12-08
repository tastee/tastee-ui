import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { File } from 'app/models/file';

@Injectable()
export class WorkspaceService {

  private workspace = new Subject<Workspace>();


  constructor() {
    this.workspace.next(JSON.parse(localStorage.getItem("tastee_workspace")));
    this.workspaceUpdated().subscribe(workspace => this.saveWorkspace(workspace));
  }

  createNewWorkspace(path: string) {
    let workspace = new Workspace();
    workspace.workspacePath = path;
    this.workspace.next(workspace);
  }

  workspaceUpdated(): Observable<Workspace> {
    return this.workspace.asObservable();
  }

  updateWorkspace(workspace: Workspace) {
    this.workspace.next(workspace);
  }

  getWorkspace(): Workspace {
    return JSON.parse(localStorage.getItem("tastee_workspace"));
  }

  saveWorkspace(workspace: Workspace) {
    localStorage.setItem("tastee_workspace", JSON.stringify(workspace));
  }


  public removeFileInWorkspace(file: File): Workspace {
    let workspace = this.getWorkspace();
    let index = workspace.openedFiles.findIndex(fileToRemove => fileToRemove.path === file.path);
    workspace.openedFiles = workspace.openedFiles.filter(fileToRemove => fileToRemove.path !== file.path);
    if (index >= workspace.openedFiles.length) {
      --index;
    }
    workspace.displayedFile = workspace.openedFiles[index];
    workspace.selectedFileInTree = workspace.openedFiles[index];
    return workspace;
  }
}
