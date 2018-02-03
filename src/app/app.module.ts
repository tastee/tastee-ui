import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';

import {ElectronService} from './providers/electron.service';
import {HeaderComponent} from './components/header/header.component';
import {MenuComponent} from './components/menu/menu.component';
import {TreeComponent} from './components/content/tree/tree.component';
import {WorkspaceService} from 'app/services/workspace.service';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {ContentFileComponent} from './components/content/content-file/content-file.component';
import {EntryComponent} from './components/content/tree/entry/entry.component';
import {WysiwygComponent} from './components/content/wysiwyg/wysiwyg.component';
import {ConfigFileComponent} from './components/content/content-file/config-file/config-file.component';
import {TasteeFileComponent} from './components/content/content-file/tastee-file/tastee-file.component';
import {ParametersComponent} from './components/content/parameters/parameters.component';
import {SessionService} from 'app/services/session.service';
import {FileService} from './services/file.service';
import {TasteeService} from './services/tastee.service';
import {WysiwygToolbarComponent} from './components/content/wysiwyg/wysiwyg-toolbar/wysiwyg-toolbar.component';
import {ContentComponent} from './components/content/content.component';
import {FilesToolbarComponent} from './components/header/files-toolbar/files-toolbar.component';
import {ResultToolbarComponent} from './components/content/result-toolbar/result-toolbar.component';
import {TasteeToolbarComponent} from './components/header/tastee-toolbar/tastee-toolbar.component';
import {WysiwygLineComponent} from 'app/components/content/wysiwyg/wysiwyg-lines/wysiwyg-line.component';
import {ReversePipe} from 'app/providers/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    TreeComponent,
    WelcomeComponent,
    ContentFileComponent,
    EntryComponent,
    WysiwygComponent,
    WysiwygLineComponent,
    WysiwygToolbarComponent,
    ConfigFileComponent,
    TasteeFileComponent,
    ParametersComponent,
    ContentComponent,
    ResultToolbarComponent,
    FilesToolbarComponent,
    TasteeToolbarComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ElectronService,
    WorkspaceService,
    SessionService,
    FileService,
    TasteeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
