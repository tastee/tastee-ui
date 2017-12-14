import {Component, Input, OnInit} from '@angular/core';
import {File} from 'app/models/file';
import {FileService} from 'app/services/file.service';
import {WorkspaceService} from 'app/services/workspace.service';


@Component({
  selector: 'app-yaml-file',
  templateUrl: './yaml-file.component.html',
  styleUrls: ['./yaml-file.component.scss']
})
export class YamlFileComponent implements OnInit {
  @Input() file: File;

  public isValidYamlFile: Boolean = false;
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
      this.fileService.saveFile(this.file, this.file.data);
    }
  }
}
