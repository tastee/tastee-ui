import {Component, OnDestroy} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {WorkspaceService} from './services/workspace.service';
import {Workspace} from './models/workspace';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private subWorkspaceUpdated: Subscription;
  public workspace: Workspace;

  constructor(public electronService: ElectronService, private _workspaceService: WorkspaceService) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    this.workspace = this._workspaceService.getWorkspace();
    this.subWorkspaceUpdated = this._workspaceService.workspaceUpdated().subscribe(workspace => {
      this.workspace = workspace;
    });
  }
  openDocumentation() {
    window.open('https://github.com/tastee/tastee-doc');
  }
  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }
}
