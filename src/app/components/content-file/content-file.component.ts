import { Component, OnDestroy, Input, OnInit, OnChanges } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';
import { Workspace } from 'app/models/workspace';
import { TasteeService } from 'app/services/tastee.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss'],
  providers: [FileService, TasteeService]
})
export class ContentFileComponent implements OnChanges {

  @Input() public workspace: Workspace;


  public file: File;

  private isTasteeFile: Boolean = false;
  private isConfigFile: Boolean = false;
  private isOtherFile: Boolean = false;

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.openFile(this.workspace);
  }

  openFile(workspace: Workspace) {
    if (workspace.displayedFile) {
      this.file = new File();
      this.file.path = workspace.displayedFile.path;
      this.file.name = workspace.displayedFile.name;
      this.file.type = workspace.displayedFile.type;
      this.isTasteeFile = this.fileService.isTasteeFile(this.file);
      this.isConfigFile = this.fileService.isConfigFile(this.file);
      this.isOtherFile = !this.isTasteeFile && !this.isConfigFile;
      if (this.file.path) {
        this.file.data = this.fileService.readFile(this.file.path.toString());
      }
    } else {
      this.file = null;
      this.isTasteeFile = false;
      this.isOtherFile = false;
      this.isConfigFile = false;
    }
  }

}
