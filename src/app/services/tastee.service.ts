import { Injectable } from '@angular/core';

import { TasteeCore } from 'tastee-core/transpiled/src/app/tastee-core';
import { TasteeReporter } from 'tastee-core/transpiled/src/app/tastee-reporter';
import { TasteeEngine } from 'tastee-core/transpiled/src/app/tastee-engine';
import { TasteeAnalyser } from 'tastee-core/transpiled/src/app/tastee-analyser';
import { ExtractTasteeCode } from 'tastee-html';
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

  runTastee(file: File): Promise<any> {
    return this.workingByFile(file.path).then(result => { return result.instructions });
  }

  runTasteeInWorkspace(workspace: Workspace): Promise<any> {
    let files = glob.sync(path.join(workspace.workspacePath, '**', '*.tee'))
    let promises = new Array<Promise<string[]>>();

    files.forEach(file => {
      promises.push(this.workingByFile(file));
    });
    return Promise.all(promises).then(values => {
      return values;
    });
  }

  workingByFile(pathToAnalyse: string): Promise<any> {

    this.core.init(new TasteeEngine('firefox'))
    const data = ExtractTasteeCode.extract(pathToAnalyse);
    const regex = /\/\/savor\ (.*.yaml)/g
    let match;
    while (match = regex.exec(data.join('\n'))) {
      if (path.isAbsolute(match[1])) {
        this.core.addPluginFile(path)
      } else {
        const pathOfFile = path.join(path.dirname(pathToAnalyse), match[1]);
        if (fs.existsSync(pathOfFile)) {
          console.log(pathOfFile);
          this.core.addPluginFile(pathOfFile)
        }
      }
    }
    return this.core.execute(data.join('\n'), pathToAnalyse).then(result => { return { name: pathToAnalyse, instructions: result } });
  }

  stopTastee() {
    this.core.stop();
  }

}
