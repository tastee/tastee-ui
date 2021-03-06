import { Injectable } from '@angular/core';

import { TasteeAnalyser, TasteeCore, TasteeEngine, TasteeReporter } from 'tastee-core';
import { ExtractTasteeCode } from 'tastee-html';
import { Workspace } from '../models/workspace';
import { FileService } from '../services/file.service';
import * as  glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { File } from '../models/file';
import { AppConfig } from '../../environments/environment';
import { SessionService } from '../services/session.service';
import { WkpEvent } from '../models/wkpEvent';


@Injectable()
export class TasteeService {
  core: TasteeCore;

  constructor(private fileService: FileService, private sessionService: SessionService) {
    process.env['PATH'] = process.env['PATH'] + ':/usr/local/bin';
    this.core = new TasteeCore(new TasteeAnalyser());
  }

  runTastee(file: File): Promise<any> {
    return this.workingByFile(file.path).then(result => { return result.instructions });
  }

  runTasteeInWorkspace(workspace: Workspace): Promise<any> {
    const files = glob.sync(path.join(workspace.workspacePath, '**', '*' + AppConfig.tastee_file_ext))
    const promises = new Array<Promise<string[]>>();

    files.forEach(file => {
      promises.push(this.workingByFile(file));
    });
    return Promise.all(promises).then(values => {
      return values;
    });
  }

  workingByFile(pathToAnalyse: string): Promise<any> {
    this.core.init(new TasteeEngine(this.sessionService.getSession().browser))
    const data = ExtractTasteeCode.extract(pathToAnalyse);
    this._managePlugin(data, pathToAnalyse);
    return this._runTasteeCode(data, pathToAnalyse);
  }


  stopTastee() {
    console.log('STOPING Tastee ....');
    this.core.stop();
  }

  startTastee() {
    console.log('STARTING Tastee ....');
    this.core.init(new TasteeEngine(this.sessionService.getSession().browser));
  }

  runTasteeLine(line: string, pathToAnalyse: string): Promise<WkpEvent> {
    const event = new WkpEvent();
    event.title = line;
    if (!this._managePlugin([line], pathToAnalyse)) {
      return this._runTasteeCode([line], pathToAnalyse).then(result => {
        event.isError = !result[0].valid;
        event.message = !event.isError ? 'OK' : result[0].errorMessage;
        event.details = 'Trying to run resulting js command :<br/>' + result[0].command.split(';').join(';<br/>');
        event.imgURL = !event.isError ? './assets/tastee.png' : './assets/fail.png';
        event.command = result[0].command;
        return event;
      })
    }
    event.message = 'Plugin Added';
    event.imgURL = './assets/tastee.png';
    return Promise.resolve(event);
  }

  private _runTasteeCode(data: Array<String>, pathToAnalyse?: string): any {
    return this.core.execute(data.join('\n'), pathToAnalyse);
  }

  private _managePlugin(data: Array<String>, pathToAnalyse: string): boolean {
    const regex = AppConfig.keyword_to_include_yaml_file;
    let match;
    let pluginTreated = false;
    while (match = regex.exec(data.join('\n'))) {
      switch (path.extname(match[1])) {
        case AppConfig.tastee_config_file_ext:
          this.core.addPluginFile(this._getPathOfFile(pathToAnalyse, match[1]));
          pluginTreated = true;
          break;
        case AppConfig.tastee_properties_file_ext:
          console.log(this._getPathOfFile(pathToAnalyse, match[1]));
          this.core.addParamFile(this._getPathOfFile(pathToAnalyse, match[1]));
          break;
      }
    }
    return pluginTreated;
  }

  _getPathOfFile(pathToAnalyse: string, pathFile: string): string {
    if (path.isAbsolute(pathFile)) {
      return pathFile;
    } else {
      const pathOfFile = path.join(path.dirname(pathToAnalyse), pathFile);
      if (fs.existsSync(pathOfFile)) {
        return pathOfFile;
      }
    }
  }
}
