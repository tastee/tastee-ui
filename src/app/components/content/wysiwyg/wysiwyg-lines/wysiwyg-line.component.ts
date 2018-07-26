import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WorkspaceService} from '../../../../services/workspace.service';
import {Subscription} from 'rxjs';
import {TasteeService} from '../../../../services/tastee.service';
import {File} from '../../../../models/file';

@Component({
  selector: 'app-wysiwyg-line',
  templateUrl: './wysiwyg-line.component.html',
  styleUrls: ['./wysiwyg-line.component.scss']
})
export class WysiwygLineComponent implements OnInit, OnDestroy  {

  @Input() isbrowserLaunched = false;
  @Input() file: File;

  _lineToRun : LineToRun[] = [];
  private _subscription : Subscription;

  constructor(private _workspaceService: WorkspaceService,
    private _tasteeService: TasteeService) { }

  ngOnInit() {
    this._subscription = this._workspaceService.onAction().subscribe(action => this._execute(action));
  }

  ngOnDestroy() {
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }

  runTasteeLine(event) {
    if (this.isbrowserLaunched) {
      this._tasteeService.runTasteeLine(event.srcElement.innerText, this.file.path).then(result => {
        this._workspaceService.addEvent(result);
      });
    }
  }

  private _execute(role: string) {
    switch (role) {
      case 'pre':
        this._updateTasteeCodeDoubleClickEvent();
        break;
      case 'startTastee':
        this._tasteeService.startTastee();
        this._updateTasteeCodeDoubleClickEvent();
        break;
      case 'stopTastee':
      if(this.isbrowserLaunched){
        this._tasteeService.stopTastee();
        this._lineToRun = [];
        break;
      }
      case 'runTastee':
        this._lineToRun = [];
        break;
      default:
        break;
    }
  }

  private _updateTasteeCodeDoubleClickEvent() {
    const tasteeCode = document.querySelectorAll('#editor pre.tastee');
    const editor = document.querySelector('#editor').getBoundingClientRect().top;

    for (let i = 0; i < tasteeCode.length; ++i) {
      const line = new LineToRun();
      line.html = tasteeCode[i].innerHTML;
      line.top = tasteeCode[i].getBoundingClientRect().top - (editor);
      this._lineToRun.push(line);
    }

  }

  private _runTastee() {
    this._tasteeService.runTastee(this.file).then(instructions => {
      this._tasteeService.stopTastee();
    })
  }
}

class LineToRun {
  html:string;
  top:number;
}


