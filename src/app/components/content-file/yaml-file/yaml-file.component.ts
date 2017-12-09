import { Component, OnInit, Input } from '@angular/core';
import { File } from 'app/models/file';
import { FileService } from 'app/services/file.service';
import { WorkspaceService } from 'app/services/workspace.service';


@Component({
  selector: 'app-yaml-file',
  templateUrl: './yaml-file.component.html',
  styleUrls: ['./yaml-file.component.scss']
})
export class YamlFileComponent implements OnInit {
  @Input() file: File;

  public isValidYamlFile: boolean = false;
  public errorMessage: string;
  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.validateFile();
  }

  validateFile() {
    this.errorMessage = this.fileService.validateYaml(this.file);
  }
  saveData() {
    this.validateFile();
    if (this.file.path) {
      this.fileService.saveFile(this.file);
    }
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
}
