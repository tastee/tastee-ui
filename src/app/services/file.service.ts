import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
const fs = require('fs');
const path = require('path');
const tree = require('directory-tree');
;
@Injectable()
export class FileService {

  constructor() { }

  readFile(file: String): String {
    return fs.readFileSync(file);
  }
  saveFile(workspace: Workspace, file: String, data: String) {
    fs.writeFileSync(path.join(workspace.path, file), data);
  }

  getFilesInWorkspace(workspace: Workspace) {
    return tree(workspace.path)
  }
}
