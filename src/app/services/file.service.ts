import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
const fs = require('fs')
const path = require('path')

@Injectable()
export class FileService {

  constructor() { }

  readFile(workspace: Workspace, file: String): String {
    return fs.readFileSync(path.join(workspace.path, file));
  }
  saveFile(workspace: Workspace, file: String, data: String) {
    fs.writeFileSync(path.join(workspace.path, file), data);
  }
}
