import { Component, OnDestroy, Input } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { TreeService } from 'app/services/tree.service';
import { Subscription } from 'rxjs/Subscription';

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
  constructor(private workspaceService: WorkspaceService, private treeService: TreeService) {
    this.subscription = this.treeService.observeSelectedFile().subscribe(childSelected => {
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
  selectedFile(child) {
    this.treeService.selectedThisFile(child);
  }

  displayFile(child) {
    this.workspaceService.pushFileInOpenFileView(child);
    this.workspaceService.selectThisFile(child);
  }
}
