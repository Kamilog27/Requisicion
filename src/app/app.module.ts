import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequisicionComponent } from './pages/requisicion/requisicion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListarrequisicionComponent } from './pages/listarrequisicion/listarrequisicion/listarrequisicion.component';


@NgModule({
  declarations: [
    AppComponent,
    RequisicionComponent,
    ListarrequisicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [//{provide : LocationStrategy , useClass : HashLocationStrategy}
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
