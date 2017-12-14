import {Component} from '@angular/core';
import {Session} from 'app/models/session';
import {SessionService} from 'app/services/session.service';
import {environment} from '../../../environments';

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
    this.browsers = environment.browsers;
    this.session = this.sessionService.getSession();
  }

  save() {
    this.sessionService.updateSession(this.session);
  }

}
