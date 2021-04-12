import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SorteioModule } from './sorteio/sorteio.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    SorteioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
