import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { File } from '../../models/file';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit, OnDestroy {

  subscription : Subscription;

  @Input() isbrowserLaunched = false;

  textOverlay : string = null;
  overlayRole= "";
  overlayValue= "";

  @Input() file: File;
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  constructor(private _workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.subscription = this._workspaceService.onAction().subscribe(action => this._execute(action));

  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
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
        case 'stopTastee':
        case 'runTastee':
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
}
