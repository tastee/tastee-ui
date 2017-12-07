import { Component, OnInit } from '@angular/core';
import { TasteeService } from '../../services/tastee.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { Workspace } from 'app/models/workspace';
import { Subscription } from 'rxjs/Subscription';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TasteeService, FileService]
})
export class HeaderComponent implements OnInit {

  private subscription: Subscription;
  public workspaceIsSelected: boolean = false;
  constructor(
    private tasteeService: TasteeService,
    private workspaceService: WorkspaceService) {
    this.workspaceIsSelected = this.workspaceService.getWorkspace() == null;
    this.subscription = this.workspaceService.workspaceChange().subscribe(workspace => this.workspaceIsSelected = workspace === null);
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
    this.subscription.unsubscribe();
  }
}
