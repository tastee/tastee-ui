import {Injectable} from '@angular/core';
import {AppConfig} from '../../environments/environment';
import {Session} from '../models/session';

@Injectable()
export class SessionService {

  public session: Session;
  constructor() {
    if (!this.getSession()) {
      this.session = new Session(AppConfig.default_browser);
      this.updateSession(this.session);
    }
  }
  updateSession(session: Session) {
    localStorage.setItem(AppConfig.local_storage_session_name, JSON.stringify(session));
  }

  getSession(): Session {
    return JSON.parse(localStorage.getItem(AppConfig.local_storage_session_name));
  }
}
