import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { WorkspaceService } from 'app/services/workspace.service';
import { File } from 'app/models/file';

@Component({
  selector: 'app-home',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnDestroy {

  public files: Array<File> = [];
  private subFilesToDisplay: Subscription;

  constructor(private workspaceService: WorkspaceService) {
    this.workspaceService.getWorkspace().openedFiles.forEach(file => this.files.push(file));
    this.subFilesToDisplay = this.workspaceService.obsFilesToOpen().subscribe(file => {
      this.files.push(file)
    });
  }

  ngOnDestroy() {
    this.subFilesToDisplay.unsubscribe();
  }

  removeFile(file) {
    let indexOfFile = this.files.indexOf(file);
    this.files.splice(indexOfFile, 1);
    this.workspaceService.getWorkspace().openedFiles.splice(this.workspaceService.getWorkspace().openedFiles.indexOf(file), 1);
    if (indexOfFile > 0) {
      this.workspaceService.displayThisFile(this.files[--indexOfFile]);
    } else if (this.files.length > 0) {
      this.workspaceService.displayThisFile(this.files[indexOfFile]);
    } else {
      this.workspaceService.displayThisFile(null);
    }
  }

  selectFile(file) {
    this.workspaceService.displayThisFile(file);
  }

}
