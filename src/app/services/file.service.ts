import { Injectable } from '@angular/core';
import { Workspace } from 'app/models/workspace';
import * as fs from 'fs';
import * as path from 'path';
import * as tree from 'directory-tree';
import * as mkdirp from 'mkdirp';
import * as yaml from 'js-yaml';
import * as rimraf from 'rimraf';
import { File } from 'app/models/file';
import { environment } from '../../environments';


@Injectable()
export class FileService {

  constructor() { }

  readFile(file: string): string {
    return fs.readFileSync(file).toString();
  }

  isTasteeFile(file: File) {
    if (file && file.path) {
      return path.extname(file.name) === environment.tastee_file_ext;
    }
    return false;
  }


  isConfigFile(file: File) {
    if (file && file.path) {
      return path.extname(file.name) === environment.tastee_config_file_ext;
    }
    return false;
  }

  saveFile(file: File, data: string) {
    fs.writeFileSync(file.path, data);
  }

  createFile(file: File) {
    if (file.type === 'directory') {
      mkdirp.sync(path.join(file.path, file.name));
    } else {
      fs.writeFileSync(path.join(file.path, file.name), '');
    }
  }

  deleteFile(file: File) {
    if (file.type === 'file') {
      fs.unlinkSync(file.path);
    } else {
      rimraf.sync(file.path);
    }
  }
  getFilesInWorkspace(workspace: Workspace) {
    return tree(workspace.workspacePath)
  }

  getParentDirectory(file: File): string {
    return path.dirname(file.path);
  }

  validateYaml(file: File): string {
    try {
      yaml.safeLoad(file.data);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
