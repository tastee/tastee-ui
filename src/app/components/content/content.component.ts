import {Component, Input, OnInit, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {Workspace} from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { WorkspaceService } from 'app/services/workspace.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public workspace: Workspace;
  menuSelected = 'home';
  displayResults = false;

  private _subscription : Subscription;

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this._subscription = this._workspaceService.onAction().subscribe(action => this._toggleResults(action));
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void  {
    if (this.workspace && this.workspace.menu) {
      this.menuSelected = this.workspace.menu;
    }
  }

  ngOnDestroy(): void  {
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }

  private _toggleResults(action: string): void {

    if(this.displayResults){
      this.displayResults = (action !== 'stopTastee');
    } else {
      this.displayResults = (action === 'startTastee');
    }
  }
}
