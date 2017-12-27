import { Component, Input, OnInit } from '@angular/core';
import { File } from 'app/models/file';
import { FileService } from 'app/services/file.service';
import { WorkspaceService } from 'app/services/workspace.service';
import { WkpEvent } from 'app/models/wkpEvent';


@Component({
  selector: 'app-config-file',
  templateUrl: './config-file.component.html',
  styleUrls: ['./config-file.component.scss']
})
export class ConfigFileComponent implements OnInit {
  @Input() file: File;
  @Input() isYamlFile: Boolean;

  constructor(private _workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.validateFile();
  }

  validateFile() {
    if (this.isYamlFile) {
      const errorMessage = this.fileService.validateYaml(this.file);
      const event = new WkpEvent();
      event.title = 'YAML Validator';
      event.isError = errorMessage ? true : false;
      event.message = !event.isError ? 'Your file is good' : errorMessage;
      event.imgURL = !event.isError ? './assets/tastee.png' : './assets/fail.png';
      this._workspaceService.addEvent(event);
    }
  }
  saveData() {
    this.validateFile();
    if (this.file.path) {
      this.fileService.saveFile(this.file, this.file.data);
    }
  }
}
