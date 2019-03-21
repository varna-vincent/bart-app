import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';
import { TripsPage } from './../trips/trips.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	
  	prevSelectedSource: string;
 	prevSelectedDest: string;

	@Input() stationsSelected = { source: { abbr: '' }, destination: { abbr: '' } }
	
	public stations: any = [];
	public message: string;

	constructor(private homeService: HomeService, private storage: Storage) {
		this.message = 'Hello from HomeComponent constructor';
	}

	ngOnInit() {
	  this.loadStations();
	  
	  this.storage.get('prev_selected_source').then((val) => {
	    console.log('Your age is', val);
	    this.prevSelectedSource = val;
	  });
	  this.prevSelectedSource = window.localStorage.getItem( 'prev_selected_source');
	  this.prevSelectedDest = window.localStorage.getItem( 'prev_selected_dest');
	  console.log(this.prevSelectedSource);
	  console.log(this.prevSelectedDest);
	}

	// Get stations list
	loadStations() {
	    return this.homeService.getStations().subscribe((data: {}) => {
	      this.stations = data;
	      console.log(data);
	    })
	}
}
