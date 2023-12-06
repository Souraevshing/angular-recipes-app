import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRootReducer from './store/app.root-reducer';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(fromRootReducer.rootReducer),
    EffectsModule.forRoot([AuthEffects]),
    ToastrModule.forRoot({
      timeOut: 2000,
      extendedTimeOut: 500,
      closeButton: true,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
      easeTime: 200,
      easing: 'ease-in-out',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
