import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class WorkspaceService {

  constructor() { }

  private currentWorkspace = new Subject<Workspace>();

  new(path: string) {
    let workspace = new Workspace(path);
    this.currentWorkspace.next(workspace);
    localStorage.setItem("tastee_workspace", JSON.stringify(workspace));
  }

  workspaceChange(): Observable<Workspace> {
    return this.currentWorkspace.asObservable();
  }

  getWorkspace() {
    return JSON.parse(localStorage.getItem("tastee_workspace"));
  }
}
