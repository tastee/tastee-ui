import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { File } from 'app/models/file';
import { environment } from '../../environments';

@Injectable()
export class WorkspaceService {

  private workspace = new Subject<Workspace>();


  constructor() {
    this.workspace.next(JSON.parse(localStorage.getItem(environment.local_storage_worskpace_name)));
    this.workspaceUpdated().subscribe(workspace => this.saveWorkspace(workspace));
  }

  createNewWorkspace(path: string) {
    const workspace = new Workspace();
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
    return JSON.parse(localStorage.getItem(environment.local_storage_worskpace_name));
  }

  saveWorkspace(workspace: Workspace) {
    localStorage.setItem(environment.local_storage_worskpace_name, JSON.stringify(workspace));
  }


  public removeFileInWorkspace(file: File): Workspace {
    const workspace = this.getWorkspace();
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
