import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { ElementRef } from '@angular/core';
import {WorkspaceService} from '../../services/workspace.service';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {

  @Input() data: String;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit() {
    this._workspaceService.onWysiwygAction().subscribe(action => this.formatWrite(action))
  }

  private formatWrite(role) {
    switch (role) {
      case 'h1':
      case 'h2':
      case 'p':
        document.execCommand('formatBlock', false, role);
        break;
      case 'pre':
        this._formatTasteeCode();
        break;
      default:
        document.execCommand(role, false, null);
        break;
    }
  }

  private _formatTasteeCode() {
    document.execCommand('formatBlock', false, 'pre');
    document.querySelector('#editor pre:not(.tastee)').className += ' tastee';
  }

  dataChanged(innerHTML: string) {
    this.onChange.emit(innerHTML);
  }
}
