import {Component, HostBinding, OnInit} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';
import {WkpEvent} from '../../../models/wkpEvent';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html',
  styleUrls: ['./result-toolbar.component.scss']
})
export class ResultToolbarComponent implements OnInit {

  events: WkpEvent[] = [];

  @HostBinding('class.fullwidth')  fullwidth = false;

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit() {
    this._workspaceService.onEvent().subscribe(event => this._manage(event));
  }

  toggleFullwidth() {
    this.fullwidth = !this.fullwidth;
  }

  getJavascriptContent(){
    let content = '';
    this.events.forEach(event => {
      if (event.command) {
        content = content + '\n' + event.command.split(';').join(';\n');
      }
    });
    alert(content);
  }

  private _manage(event: WkpEvent) {
    if (event) {
      this.events.push(event);
    } else {
      this.events = [];
      this.fullwidth = false;
    }
  }
}
