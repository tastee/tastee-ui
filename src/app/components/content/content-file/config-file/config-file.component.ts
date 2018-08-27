import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { File } from '../../../../models/file';
import { FileService } from '../../../../services/file.service';
import { WorkspaceService } from '../../../../services/workspace.service';
import { WkpEvent } from '../../../../models/wkpEvent';


@Component({
  selector: 'app-config-file',
  templateUrl: './config-file.component.html',
  styleUrls: ['./config-file.component.scss']
})
export class ConfigFileComponent implements OnInit {
  @Input() file: File;
  @Input() isYamlFile: Boolean;
  @Output() onChange: EventEmitter<string> = new EventEmitter();

  constructor(private _workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.validateFile();
  }

  onTab(tabEvent) {
    tabEvent.target.value = tabEvent.target.value.substring(0, tabEvent.target.selectionStart)
      + '    ' + tabEvent.target.value.substring(tabEvent.target.selectionEnd, tabEvent.target.value.length);
    tabEvent.target.setSelectionRange(tabEvent.target.selectionEnd, tabEvent.target.selectionEnd);
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
    this.onChange.emit(this.file.data);
  }
}
