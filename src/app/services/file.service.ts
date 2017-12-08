import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import * as fs from 'fs';
import * as path from 'path';
import * as tree from 'directory-tree';
import { File } from 'app/models/file';


@Injectable()
export class FileService {

  constructor() { }

  readFile(file: string): string {
    return fs.readFileSync(file).toString();
  }

  isTasteeFile(file: string) {
    return path.extname(file) === ".tee";
  }

  saveFile(workspace: Workspace, file: string, data: String) {
    fs.writeFileSync(path.join(workspace.workspacePath, file), data);
  }
  createFile(file: string) {
    fs.writeFileSync(file, '');
  }
  deleteFile(file: File) {
    fs.unlinkSync(file.path.toString());
  }
  getFilesInWorkspace(workspace: Workspace) {
    return tree(workspace.workspacePath)
  }
}
