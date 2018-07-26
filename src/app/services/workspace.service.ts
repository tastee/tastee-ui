import {Injectable} from '@angular/core';
import {Workspace} from '../models/workspace';
import {Observable, Subject} from 'rxjs';
import {AppConfig} from '../../environments/environment';
import {WkpEvent} from '../models/wkpEvent';

@Injectable()
export class WorkspaceService {

  private workspace = new Subject<Workspace>();
  private _actions = new Subject<string>();
  private _events = new Subject<WkpEvent>();


  constructor() {
    this.workspace.next(JSON.parse(localStorage.getItem(AppConfig.local_storage_worskpace_name)));
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
    this.launchAction('stopTastee');
  }

  getWorkspace(): Workspace {
    return JSON.parse(localStorage.getItem(AppConfig.local_storage_worskpace_name));
  }

  saveWorkspace(workspace: Workspace) {
    localStorage.setItem(AppConfig.local_storage_worskpace_name, JSON.stringify(workspace));
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
}
