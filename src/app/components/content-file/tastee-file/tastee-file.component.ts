import { Component, Input, OnInit } from '@angular/core';
import { File } from 'app/models/file';
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

  constructor(private workspaceService: WorkspaceService,
    private fileService: FileService) { }

  ngOnInit() {
    this.instructions = [];
  }

  saveData(event) {
    if (this.file.path) {
      this.fileService.saveFile(this.file, event);
    }
  }

  displayActionsIfTasteeFile(): boolean {
    if (this.file.path) {
      return this.fileService.isTasteeFile(this.file);
    }
    return false;
  }
}
