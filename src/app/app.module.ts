import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { TreeComponent } from './components/tree/tree.component';
import { WorkspaceService } from 'app/services/workspace.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ContentFileComponent } from './components/content-file/content-file.component';
import { EntryComponent } from './components/tree/entry/entry.component';
import { WysiwygComponent } from './components/wysiwyg/wysiwyg.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HeaderComponent,
    MenuComponent,
    TreeComponent,
    WelcomeComponent,
    ContentFileComponent,
    EntryComponent,
    WysiwygComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ElectronService, WorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
