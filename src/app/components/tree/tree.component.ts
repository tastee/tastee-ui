import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'app/services/workspace.service';
import { FileService } from 'app/services/file.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [FileService]
})
export class TreeComponent implements OnInit, OnDestroy {

  public tree: any;
  private subDeleteFileInTree: Subscription;
  private subUpdateTreeInWorkspace: Subscription;

  constructor(
    private workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.tree = this.getFilesFromFs();
    this.subDeleteFileInTree = this.workspaceService.obsDeleteFileInTree().subscribe(file => {
      this.tree = this.getFilesFromFs();
    });
    this.subUpdateTreeInWorkspace = this.workspaceService.obsUpdateTreeInWorkspace().subscribe(_ => {
      this.tree = this.getFilesFromFs();
    });
  }

  getFilesFromFs() {
    return this.fileService.getFilesInWorkspace(this.workspaceService.getWorkspace());
  }
  ngOnDestroy() {
    this.subDeleteFileInTree.unsubscribe();
    this.subUpdateTreeInWorkspace.unsubscribe();
  }
}
