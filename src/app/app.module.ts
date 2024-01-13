import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashComponent } from './dash/dash.component';
import { CommandsComponent } from './dash/commands/commands.component';
import { DashPanelComponent } from './dash/dash-panel/dash-panel.component';
import { NavbarComponent } from './dash/navbar/navbar.component';
import { SidepanelComponent } from './dash/sidepanel/sidepanel.component';
import { CommandItemComponent } from './dash/commands/command-item/command-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashComponent,
    CommandsComponent,
    DashPanelComponent,
    NavbarComponent,
    SidepanelComponent,
    CommandItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
