import { Component, OnInit, Input } from '@angular/core';
import { File } from 'app/models/file';
import { TasteeService } from 'app/services/tastee.service';
import { FileService } from 'app/services/file.service';
import { WorkspaceService } from 'app/services/workspace.service';

@Component({
  selector: 'app-tastee-file',
  templateUrl: './tastee-file.component.html',
  styleUrls: ['./tastee-file.component.scss']
})
export class TasteeFileComponent implements OnInit {

  @Input() file: File;
  private instructions: Array<any>;
  public data: String;

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService,
    private tasteeService: TasteeService) { }

  ngOnInit() {
    this.instructions = [];    
  }

  saveData() {
    if (this.file.path) {
      this.fileService.saveFile(this.file);
    }
  }

  displayActionsIfTasteeFile(): boolean {
    if (this.file.path) {
      return this.fileService.isTasteeFile(this.file);
    }
    return false;
  }

  saveFile() {
    let newFile = this.file.path === null;
    this.file = this.fileService.saveFile(this.file);
    let workspace = this.workspaceService.getWorkspace();
    workspace.displayedFile = this.file;
    workspace.selectedFileInTree = this.file;
    let idx = workspace.openedFiles.findIndex(file => !file.path);
    workspace.openedFiles[idx] = this.file;
    if (newFile) {
      this.workspaceService.updateWorkspace(workspace);
    }
  }

  deleteFile() {
    this.fileService.deleteFile(this.file);
    let workspace = this.workspaceService.removeFileInWorkspace(this.file);
    this.workspaceService.updateWorkspace(workspace);
  }
  runTastee() {
    this.instructions = [];
    this.tasteeService.runFileWithTastee(this.file).then(instructions => {
      this.instructions = instructions;
    })
  }
}
