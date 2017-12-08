import { Component, OnDestroy } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { File } from 'app/models/file';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss'],
  providers: [FileService]
})
export class ContentFileComponent implements OnDestroy {

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) {
    if (workspaceService.getWorkspace().displayedFile !== null) {
      this.openFile(workspaceService.getWorkspace().displayedFile);
    }
  }

  public fileName: String;
  public data: String;
  private subSelectedFile: Subscription;

  ngOnInit() {
    this.subSelectedFile = this.workspaceService.obsDisplayedFile().subscribe(file => this.openFile(file));
  }

  openFile(file: File) {
    if (file !== null) {
      this.fileName = file.name;
      this.data = this.fileService.readFile(file.path.toString());
    } else {
      this.fileName = null;
      this.data = null;
    }
  }
  saveData() {
    console.log(this.data);
    this.fileService.saveFile(this.workspaceService.getWorkspace(), this.fileName.toString(), this.data);
  }

  displayActionsIfTasteeFile(): boolean {
    return this.fileService.isTasteeFile(this.fileName.toString());
  }

  ngOnDestroy() {
    this.subSelectedFile.unsubscribe();
  }
}
