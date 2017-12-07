import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { TreeService } from 'app/services/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [FileService, TreeService]
})
export class TreeComponent implements OnInit {

  public tree: any;

  constructor(private workspaceService: WorkspaceService, private fileService: FileService) { }

  ngOnInit() {
    this.tree = this.fileService.getFilesInWorkspace(this.workspaceService.getWorkspace());
  }
}
