import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from '../../../services/workspace.service';
import {WkpEvent} from '../../../models/wkpEvent';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html'
})
export class ResultToolbarComponent implements OnInit {

  events: WkpEvent[] = [];

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit() {
    this._workspaceService.onEvent().subscribe(event => this._manage(event));
  }

  private _manage(event: WkpEvent) {
    if (event) {
      this.events.push(event);
    }else {
      this.events = [];
    }
  }
}
