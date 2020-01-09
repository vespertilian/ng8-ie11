import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { INACTIVITY_PROVIDER } from './inactivity-countdown-provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    INACTIVITY_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
