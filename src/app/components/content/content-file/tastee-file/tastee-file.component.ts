import { Component, Input } from '@angular/core';
import { File } from 'app/models/file';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-tastee-file',
  templateUrl: './tastee-file.component.html',
  styleUrls: ['./tastee-file.component.scss']
})
export class TasteeFileComponent {

  @Input() file: File;

  constructor(private fileService: FileService) { }

  saveData(event) {
    if (this.file.path) {
      this.fileService.saveFile(this.file, event);
    }
  }
}
