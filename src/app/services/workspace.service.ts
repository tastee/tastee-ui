import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
const fs = require('fs')

@Injectable()
export class WorkspaceService {

  constructor() { }

  private currentWorkspace = new Subject<Workspace>();

  private openFiles = new Subject<String>();

  private selectedFileSubject = new Subject<String>();

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

  getFilesInWorkspace() {
    return fs.readdirSync(this.getWorkspace().path);
  }

  pushFileInOpenFileView(file: string) {
    this.openFiles.next(file);

  }

  selectThisFile(file: String) {
    this.selectedFileSubject.next(file);
  }
  observeFilesToDisplay(): Observable<String> {
    return this.openFiles.asObservable();
  }

  observeSelectedFile(): Observable<String> {
    return this.selectedFileSubject.asObservable();
  }

}
