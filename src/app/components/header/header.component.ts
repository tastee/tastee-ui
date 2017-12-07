import { Component, OnInit } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';
import { TreeService } from 'app/services/tree.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnInit {

  private subWorkspaceEvent: Subscription;
  private subTreeActionEvent: Subscription;
  public workspaceIsSelected: boolean = false;
  public displayTreeAction: boolean = false;
  constructor(
    private tasteeService: TasteeService,
    private workspaceService: WorkspaceService,
    private treeService: TreeService) {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() == null;
    this.subWorkspaceEvent = this.workspaceService.workspaceChange().subscribe(workspace => this.workspaceIsSelected = workspace === null);
    this.subTreeActionEvent = this.treeService.observeSelectedFile().subscribe(file => this.displayTreeAction = true);
  }

  ngOnInit() {
  }

  runTastee() {
    this.tasteeService.runTastee(this.workspaceService.getWorkspace());
  }

  stopTastee() {
    this.tasteeService.stopTastee();
  }

  openWorkspace(files: FileList) {
    this.workspaceService.new(files[0].path)
  }

  ngOnDestroy() {
    this.subWorkspaceEvent.unsubscribe();
    this.subTreeActionEvent.unsubscribe();

  }
}
