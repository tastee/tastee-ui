import { Component, OnDestroy } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-content-file',
  templateUrl: './content-file.component.html',
  styleUrls: ['./content-file.component.scss'],
  providers: [FileService]
})
export class ContentFileComponent implements OnDestroy {

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) { }

  public fileName: String;
  public data: String;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.workspaceService.observeSelectedFile().subscribe(file => this.openFile(file));
  }

  openFile(file: String) {
    if (file !== null) {
      this.fileName = file;
      this.data = this.fileService.readFile(this.workspaceService.getWorkspace(), this.fileName);
      console.log(this.data.toString());
    } else {
      this.fileName = null;
      this.data = null;
    }
  }
  saveData() {
    console.log(this.data);
    this.fileService.saveFile(this.workspaceService.getWorkspace(), this.fileName, this.data);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
