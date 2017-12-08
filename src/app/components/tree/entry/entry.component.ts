import { Component, OnDestroy, Input } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { File } from 'app/models/file';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnDestroy {

  @Input() child: any;
  @Input() openSubTree: boolean = false;

  private subscription: Subscription;

  public childIsSelected: boolean = false;
  constructor(private workspaceService: WorkspaceService) {
    this.subscription = this.workspaceService.obsSelectedTreeFile().subscribe(childSelected => {
      if (this.child.path === childSelected.path) {
        this.childIsSelected = true;
      } else {
        this.childIsSelected = false;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  selectedTreeFile(file: File) {
    this.workspaceService.selectedTreeFile(file);
  }

  displayFileInWorkspace(file: File) {
    this.workspaceService.openNewFile(file);
    this.workspaceService.displayThisFile(file);
  }
}
