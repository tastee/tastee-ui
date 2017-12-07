import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { File } from 'app/models/file';

@Injectable()
export class WorkspaceService {

  constructor() { }

  private currentWorkspace = new Subject<Workspace>();

  private openFiles = new Subject<File>();

  private selectedFileSubject = new Subject<File>();

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

  pushFileInOpenFileView(file: File) {
    this.openFiles.next(file);
  }

  selectThisFile(file: File) {
    this.selectedFileSubject.next(file);
  }
  observeFilesToDisplay(): Observable<File> {
    return this.openFiles.asObservable();
  }

  observeSelectedFile(): Observable<File> {
    return this.selectedFileSubject.asObservable();
  }

}
