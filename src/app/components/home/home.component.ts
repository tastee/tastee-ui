import { Component, OnDestroy } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public files: Array<String>;
  private subscription: Subscription;

  constructor(private workspaceService: WorkspaceService) {
    this.files = [];
    this.subscription = this.workspaceService.observeFilesToDisplay().subscribe(file => this.files.push(file));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFile(index) {
    this.files.splice(index, 1);
    if (index > 0) {
      this.workspaceService.selectThisFile(this.files[--index]);
    }else{
      this.workspaceService.selectThisFile(null);
    }
  }

  selectFile(index) {
    this.workspaceService.selectThisFile(this.files[index]);
  }

}
