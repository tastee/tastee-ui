import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { TasteeService } from '../../services/tastee.service';
import { File } from '../../models/file';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit, OnDestroy {

  _clickHandler = this.runTasteeLine.bind(this);

  subscription : Subscription;

  isbrowserLaunched = false;
  textOverlay : string = null;
  overlayRole= "";
  overlayValue= "";

  @Input() file: File;
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor(private _workspaceService: WorkspaceService,
    private _tasteeService: TasteeService) { }

  ngOnInit() {
    this.subscription = this._workspaceService.onAction().subscribe(action => this._execute(action))
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  runTasteeLine(event) {
    if (this.isbrowserLaunched) {
      this._tasteeService.runTasteeLine(event.srcElement.innerText, this.file.path).then(result => {
        this._workspaceService.addEvent(result);
      });
    }
  }

  dataChanged(innerHTML: string) {
    this.onChange.emit(innerHTML);
  }

  private _execute(role: string) {
    let val = '';

    if(role.startsWith('foreColor-')){
      document.execCommand('foreColor', false, role.replace('foreColor-', ''));
    } else {

      switch (role) {
        case 'h1':
        case 'h2':
        case 'p':
        case 'div':
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
  }

  private _formatTasteeCode() {
    document.execCommand('formatBlock', false, 'pre');

    const notFormattedTasteeCode = document.querySelectorAll('#editor pre:not(.tastee)');
    if (notFormattedTasteeCode) {
      for (let i = 0; i < notFormattedTasteeCode.length; ++i) {
        notFormattedTasteeCode[i].className += ' tastee';
      }
    }
  }

  private _runTastee() {
    this._tasteeService.runTastee(this.file).then(instructions => {
      this._tasteeService.stopTastee();
    })
  }

  private _startTastee() {
    this._tasteeService.startTastee();
    this.isbrowserLaunched = true;
    this._updateTasteeCodeBoubleClickEvent();
  }

  private _stopTastee() {
    this._tasteeService.stopTastee();
    this.isbrowserLaunched = false;
    this._removeTasteeCodeBoubleClickEvent();
  }

  private _updateTasteeCodeBoubleClickEvent() {
    const tasteeCode = document.querySelectorAll('#editor pre.tastee');
    for (let i = 0; i < tasteeCode.length; ++i) {
      tasteeCode[i].addEventListener('dblclick', this._clickHandler);
    }
  }

  private _removeTasteeCodeBoubleClickEvent() {
    const tasteeCode = document.querySelectorAll('#editor pre.tastee');
    for (let i = 0; i < tasteeCode.length; ++i) {
      tasteeCode[i].removeEventListener('dblclick', this._clickHandler);
    }
  }
}
