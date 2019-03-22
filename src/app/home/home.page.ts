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
	  this.storage.get('prev_selected_source').then((val) => {
	    console.log('Your prev source is', val);
	    this.stationsSelected.source.abbr = val;
	    this.prevSelectedSource = val;
	  });
	  this.storage.get('prev_selected_dest').then((val) => {
	    console.log('Your prev dest is', val);
	    this.stationsSelected.destination.abbr = val;
	    this.prevSelectedDest = val;
	  });

	  this.loadStations();
	}

	// Get stations list
	loadStations() {
	    return this.homeService.getStations().subscribe((data: {}) => {
	      this.stations = data;
	      console.log(data);
	    })
	}
}
