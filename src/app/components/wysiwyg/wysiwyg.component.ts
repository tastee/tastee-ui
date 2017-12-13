import {Component, OnInit, Input, EventEmitter, Output, OnChanges, AfterContentChecked} from '@angular/core';
import { ElementRef } from '@angular/core';
import {WorkspaceService} from '../../services/workspace.service';
import {TasteeService} from '../../services/tastee.service';
import {File} from '../../models/file';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit, AfterContentChecked {

  _clickHandler = this.runTasteeLine.bind(this);

  @Input() file: File;
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor(private _workspaceService: WorkspaceService,
              private _tasteeService: TasteeService) { }

  ngOnInit() {
    this._workspaceService.onWysiwygAction().subscribe(action => this._execute(action))
  }

  ngAfterContentChecked() {
    this._updateTasteeCodeBoubleClickEvent();
  }

  runTasteeLine(event) {
    this._tasteeService.runTasteeLine(event.srcElement.innerText, this.file.path);
  }

  dataChanged(innerHTML: string) {
    this.onChange.emit(innerHTML);
  }

  private _execute(role) {
    switch (role) {
      case 'h1':
      case 'h2':
      case 'p':
        document.execCommand('formatBlock', false, role);
        break;
      case 'pre':
        this._formatTasteeCode();
        break;
      case 'startTastee':
        this._startTastee();
        break;
      case 'stopTastee':
        this._stopTastee();
        break;
      case 'runTastee':
        this._runTastee();
        break;
      default:
        document.execCommand(role, false, null);
        break;
    }
  }

  private _formatTasteeCode() {
    document.execCommand('formatBlock', false, 'pre');

    const notFormattedTasteeCode = document.querySelectorAll('#editor pre:not(.tastee)');
    if (notFormattedTasteeCode) {
      for (let i = 0; i < notFormattedTasteeCode.length; ++i) {
        notFormattedTasteeCode[i].className += ' tastee';
      }
    }

    this._updateTasteeCodeBoubleClickEvent();
  }

  private _updateTasteeCodeBoubleClickEvent() {
    const tasteeCode = document.querySelectorAll('#editor pre.tastee');
    for (let i = 0; i < tasteeCode.length; ++i) {
      tasteeCode[i].addEventListener('dblclick', this._clickHandler);
    }
  }

  private _runTastee() {
    this._tasteeService.runTastee(this.file).then(instructions => {
      this._tasteeService.stopTastee();
    })
  }

  private _startTastee() {
    this._tasteeService.startTastee();
  }

  private _stopTastee() {
    this._tasteeService.stopTastee();
  }
}
