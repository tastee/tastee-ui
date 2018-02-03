import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from 'app/services/workspace.service';
import {WkpEvent} from 'app/models/wkpEvent';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html',
  styleUrls: ['./result-toolbar.component.scss']
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
    } else {
      this.events = [];
    }
  }
}
