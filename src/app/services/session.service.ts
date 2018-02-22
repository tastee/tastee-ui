import {Injectable} from '@angular/core';
import {environment} from '../../environments';
import {Session} from '../models/session';

@Injectable()
export class SessionService {

  public session: Session;
  constructor() {
    if (!this.getSession()) {
      this.session = new Session(environment.default_browser);
      this.updateSession(this.session);
    }
  }
  updateSession(session: Session) {
    localStorage.setItem(environment.local_storage_session_name, JSON.stringify(session));
  }

  getSession(): Session {
    return JSON.parse(localStorage.getItem(environment.local_storage_session_name));
  }
}
