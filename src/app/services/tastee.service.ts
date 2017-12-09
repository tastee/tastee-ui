import { Injectable } from '@angular/core';

import { TasteeCore } from 'tastee-core/transpiled/src/app/tastee-core';
import { TasteeReporter } from 'tastee-core/transpiled/src/app/tastee-reporter';
import { TasteeEngine } from 'tastee-core/transpiled/src/app/tastee-engine';
import { TasteeAnalyser } from 'tastee-core/transpiled/src/app/tastee-analyser';
import { Workspace } from 'app/models/workspace';
import { FileService } from 'app/services/file.service';
import * as  glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { File } from 'app/models/file';


@Injectable()
export class TasteeService {
  core: TasteeCore;

  constructor(private fileService: FileService) {
    this.core = new TasteeCore(new TasteeAnalyser());
  }

  runFileWithTastee(file: File):Promise<any> {
    if (file) {
      this.core.init(new TasteeEngine("chrome"))
      try {
        var tastee: TasteeService = this;
        let data = fs.readFileSync(file.path, "utf8");
        let regex = /\/\/savor\ (.*.yaml)/g
        let match;
        while (match = regex.exec(data)) {
          if (path.isAbsolute(match[1])) {
            console.log(path);
            this.core.addPluginFile(path)
          } else {
            let pathOfFile = path.join(path.dirname(file.path), match[1]);
            if (fs.existsSync(pathOfFile)) {
              console.log(pathOfFile);
              this.core.addPluginFile(pathOfFile)
            }
          }
        }
        return this.core.execute(data, path.basename(file.name, ".tee"))
        .then(
          instructions => { 
            this.core.stop();
            return instructions 
          });
      } catch (error) {
        console.log(error.message)
        this.core.stop();
      }
    }
  }

  runWorkspaceWithTastee(workspace: Workspace) {
    if (workspace) {
      this.core.init(new TasteeEngine("chrome"))
      var tastee: TasteeService = this;

      glob(path.join(workspace.workspacePath, "**", "+(*.yaml|*.param.tee)"), { absolute: true }, this.recordingOfConfigurationFilesCb(this.core));
      glob(path.join(workspace.workspacePath, "**", "!(*.yaml|*.param.tee)"), { absolute: true }, this.recordingTasteeFilesCb(tastee));
    }
  }

  private readFilesTastee = (filename: string, tasteeService: TasteeService) => function (err, data) {
    console.log('Starting  :' + filename);
    if (!err) {
      tasteeService.core.execute(data, path.basename(filename, ".tee")).then(function (instructions) {
        console.log('Finished :' + filename);
      });;
    } else {
      console.error(err);
    }
  }

  private recordingTasteeFilesCb = (tasteeService: TasteeService) => function (err, filenames) {
    filenames.forEach(function (filename) {
      fs.readFile(filename, "utf8", tasteeService.readFilesTastee(filename, tasteeService));
    });
  }

  private recordingOfConfigurationFilesCb = (tasteeCore: TasteeCore) => function (err, filenames) {
    filenames.forEach(function (filename) {
      if (filename.indexOf('.conf.tee') !== -1) {
        console.log('Add plugin file :' + filename)
        tasteeCore.addPluginFile(filename);
      } else {
        console.log('Add param file :' + filename)
        tasteeCore.addParamFile(filename);
      }
    });
  }

  stopTastee() {
    this.core.stop();
  }

}
