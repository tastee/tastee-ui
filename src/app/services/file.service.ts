import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import * as fs from 'fs';
import * as path from 'path';
import * as tree from 'directory-tree';
import * as mkdirp from 'mkdirp';

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

  saveFile(file: File): File {
    if (!file.path) {
      file.path = path.join(file.directory, file.name);
      mkdirp.sync(file.directory);
    }
    fs.writeFileSync(path.join(file.directory, file.name), file.data);
    return file;
  }

  createFile(file: string) {
    fs.writeFileSync(file, '');
  }

  deleteFile(file: File) {
    fs.unlinkSync(file.path.toString());
    let files = fs.readdirSync(file.directory);
    if (files.length === 0) {
      fs.rmdirSync(file.directory);
    }
  }
  getFilesInWorkspace(workspace: Workspace) {
    return tree(workspace.workspacePath)
  }

  getParentDirectory(file: File): string {
    return path.dirname(file.path.toString());
  }
}
