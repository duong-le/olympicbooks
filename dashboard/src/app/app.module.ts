import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconModule } from './shared/icon.module';

import { JwtInterceptor } from './shared/Interceptors/jwt.interceptor';
import { ErrorInterceptor } from './shared/Interceptors/error.interceptor';

import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

registerLocaleData(vi);

@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, IconModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
