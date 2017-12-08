import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { File } from 'app/models/file';

@Injectable()
export class WorkspaceService {

  private workspace: Workspace;

  constructor() {
    this.workspace = JSON.parse(localStorage.getItem("tastee_workspace"));
  }

  private currentWorkspace = new Subject<Workspace>();
  private selectedFileInTree = new Subject<File>();
  private openFiles = new Subject<File>();
  private displayedFile = new Subject<File>();


  createNewWorkspace(path: string) {
    this.workspace = new Workspace();
    this.workspace.workspacePath = path;
    this.currentWorkspace.next(this.workspace);
    localStorage.setItem("tastee_workspace", JSON.stringify(this.workspace));
  }

  obsChangedWorkspace(): Observable<Workspace> {
    return this.currentWorkspace.asObservable();
  }

  getWorkspace() {
    return this.workspace;
  }

  saveWorkspace() {
    localStorage.setItem("tastee_workspace", JSON.stringify(this.workspace));
  }

  openNewFile(file: File) {
    if (this.workspace.openedFiles.filter(pathInArray => pathInArray.path == file.path).length === 0) {
      this.openFiles.next(file);
      this.workspace.openedFiles.push(file);
    }
  }

  displayThisFile(file: File) {
    this.workspace.displayedFile = file;
    this.displayedFile.next(file);
  }

  obsFilesToOpen(): Observable<File> {
    return this.openFiles.asObservable();
  }

  obsDisplayedFile(): Observable<File> {
    return this.displayedFile.asObservable();
  }

  selectedTreeFile(file: File) {
    this.workspace.selectedFileInTree = file;
    this.selectedFileInTree.next(file);
  }

  obsSelectedTreeFile(): Observable<File> {
    return this.selectedFileInTree.asObservable();
  }

}
