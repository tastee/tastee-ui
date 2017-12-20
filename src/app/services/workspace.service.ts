import {Injectable} from '@angular/core';
import {Workspace} from 'app/models/workspace';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {File} from 'app/models/file';
import {environment} from '../../environments';
import {WkpEvent} from '../models/wkpEvent';

@Injectable()
export class WorkspaceService {

  private workspace = new Subject<Workspace>();
  private _actions = new Subject<string>();
  private _events = new Subject<WkpEvent>();


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

  launchAction(action: string) {
    this._actions.next(action)
  }

  onAction(): Observable<string> {
    return this._actions.asObservable();
  }

  addEvent(event: WkpEvent) {
    this._events.next(event)
  }

  onEvent(): Observable<WkpEvent> {
    return this._events.asObservable();
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
