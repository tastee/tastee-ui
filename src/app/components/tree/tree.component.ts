import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [FileService]
})
export class TreeComponent implements OnInit {

  public tree: any;

  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.tree = this.fileService.getFilesInWorkspace(this.workspaceService.getWorkspace());
  }
}
