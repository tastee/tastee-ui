import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html'
})
export class FileComponent implements OnInit {

  public files: Array<File>;
  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.files = this.workspaceService.getFilesInWorkspace();
    console.log(this.files[0]);
  }

  displayFile(file){
    this.workspaceService.pushFileInOpenFileView(file);
    this.workspaceService.selectThisFile(file);
  }

}
