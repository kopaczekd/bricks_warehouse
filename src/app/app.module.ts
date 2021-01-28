import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';

import localePl from '@angular/common/locales/pl';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WarehouseInfoComponent } from './warehouse-info/warehouse-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WarehouseInfoComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
