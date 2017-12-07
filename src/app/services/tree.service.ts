import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { File } from 'app/models/file';

@Injectable()
export class TreeService {

  private selectedFile = new Subject<File>();

  constructor() { }

  selectedThisFile(file: File) {
    this.selectedFile.next(file);
  }

  observeSelectedFile(): Observable<File> {
    return this.selectedFile.asObservable();
  }

  addFile() {

  }
  updateTree() {

  }
  deleteTree() {

  }
}
