import { Component, OnDestroy } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { Workspace } from 'app/models/workspace';
import { TasteeService } from 'app/services/tastee.service';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss'],
  providers: [FileService, TasteeService]
})
export class ContentFileComponent implements OnDestroy {


  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService,
    private tasteeService: TasteeService) {
    if (workspaceService.getWorkspace().displayedFile) {
      this.openFile(workspaceService.getWorkspace());
    }
    this.subWorkspaceUpdated = this.workspaceService.workspaceUpdated().subscribe(workspace => this.openFile(workspace));
  }

  public file: File;
  
  private subWorkspaceUpdated: Subscription;
  private isTasteeFile: boolean = false;
  private isConfigFile: boolean = false;

  ngOnInit() {
  }

  openFile(workspace: Workspace) {
    if (workspace.displayedFile) {
      this.file = new File(workspace.displayedFile.path, workspace.displayedFile.name, workspace.displayedFile.type);
      this.isTasteeFile=this.fileService.isTasteeFile(this.file);
      this.isConfigFile=this.fileService.isConfigFile(this.file);
      if (workspace.selectedFileInTree) {
        this.file.directory = this.fileService.getParentDirectory(workspace.selectedFileInTree);
      } else {
        this.file.directory = workspace.treeDisplayed.path;
      }
      if (this.file.path) {
        this.file.data = this.fileService.readFile(this.file.path.toString());
      }
    } else {
      this.file = null;
    }
  }
 

  ngOnDestroy() {
    this.subWorkspaceUpdated.unsubscribe();
  }
  
}
