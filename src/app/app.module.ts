import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';            
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { Configuration } from './app.constants';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({ 
      apiKey: 'AIzaSyD3u4KtwEugomr45KkWV4px6d9Qqlc2240',
    }),
    AgmDirectionModule],
  providers: [
  	Configuration, 
    GoogleMapsAPIWrapper,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
