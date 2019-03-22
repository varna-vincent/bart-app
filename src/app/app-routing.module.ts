import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { TripsPage } from './trips/trips.page';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'trips/:source/:dest', loadChildren: './trips/trips.module#TripsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AgmCoreModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [ HomePage, TripsPage ]