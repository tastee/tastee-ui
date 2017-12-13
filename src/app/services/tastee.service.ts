import { Injectable } from '@angular/core';

import { TasteeCore } from 'tastee-core';
import { TasteeReporter } from 'tastee-core';
import { TasteeEngine } from 'tastee-core';
import { TasteeAnalyser } from 'tastee-core';
import { ExtractTasteeCode } from 'tastee-html';
import { Workspace } from 'app/models/workspace';
import { FileService } from 'app/services/file.service';
import * as  glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { File } from 'app/models/file';
import { environment } from '../../environments';
import { SessionService } from 'app/services/session.service';


@Injectable()
export class TasteeService {
  core: TasteeCore;

  constructor(private fileService: FileService, private sessionService: SessionService) {
    this.core = new TasteeCore(new TasteeAnalyser());
  }

  runTastee(file: File): Promise<any> {
    return this.workingByFile(file.path).then(result => { return result.instructions });
  }

  runTasteeInWorkspace(workspace: Workspace): Promise<any> {
    const files = glob.sync(path.join(workspace.workspacePath, '**', '*' + environment.tastee_file_ext))
    const promises = new Array<Promise<string[]>>();

    files.forEach(file => {
      promises.push(this.workingByFile(file));
    });
    return Promise.all(promises).then(values => {
      return values;
    });
  }

  workingByFile(pathToAnalyse: string): Promise<any> {
    console.log(pathToAnalyse);
    this.core.init(new TasteeEngine(this.sessionService.getSession().browser))
    const data = ExtractTasteeCode.extract(pathToAnalyse);
    this._managePlugin(data, pathToAnalyse);
    return this._runTasteeCode(data, pathToAnalyse);
  }


  stopTastee() {
    this.core.stop();
  }

  startTastee() {
    this.core.init(new TasteeEngine(this.sessionService.getSession().browser))
  }

  runTasteeLine(line: string, pathToAnalyse: string): any {
    if (!this._managePlugin([line], pathToAnalyse)) {
      return this._runTasteeCode([line], pathToAnalyse);
    }
    return 'Plugin Added'
  }

  private _runTasteeCode(data: Array<String>, pathToAnalyse?: string): any {
    return this.core.execute(data.join('\n'), pathToAnalyse).then(result => {
      return {name: pathToAnalyse, instructions: result}
    });
  }

  private _managePlugin(data: Array<String>, pathToAnalyse: string): boolean {
    const regex = environment.keyword_to_include_yaml_file;
    let match;
    let pluginTreated = false;
    while (match = regex.exec(data.join('\n'))) {
      if (path.isAbsolute(match[1])) {
        this.core.addPluginFile(path)
      } else {
        const pathOfFile = path.join(path.dirname(pathToAnalyse), match[1]);
        if (fs.existsSync(pathOfFile)) {
          this.core.addPluginFile(pathOfFile)
        }
      }
      pluginTreated = true;
    }
    return pluginTreated;
  }

}
