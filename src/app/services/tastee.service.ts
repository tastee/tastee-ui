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


@Injectable()
export class TasteeService {
  core: TasteeCore;

  constructor(private fileService: FileService) {
    this.core = new TasteeCore(new TasteeAnalyser());
  }

  runTastee(workspace: Workspace) {
    if (workspace) {
      this.core.init(new TasteeEngine("chrome"))
      var tastee: TasteeService = this;

      glob(path.join(workspace.path, "**", "+(*.conf|*.param).tee"), { absolute: true }, this.recordingOfConfigurationFilesCb(this.core));
      glob(path.join(workspace.path, "**", "!(*.conf|*.param).tee"), { absolute: true }, this.recordingTasteeFilesCb(tastee));
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
