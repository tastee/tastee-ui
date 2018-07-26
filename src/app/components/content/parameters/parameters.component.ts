import {Component} from '@angular/core';
import {Session} from '../../../models/session';
import {SessionService} from '../../../services/session.service';
import {AppConfig} from 'environments/environment';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  providers: [SessionService]
})
export class ParametersComponent {

  public session: Session;
  public browsers: Array<string>;
  constructor(private sessionService: SessionService) {
    this.browsers = AppConfig.browsers;
    this.session = this.sessionService.getSession();
  }

  save() {
    this.sessionService.updateSession(this.session);
  }

}
