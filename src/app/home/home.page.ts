import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	
	@Input() stationsSelected = { source: { abbr: '' }, destination: { abbr: '' } }
	
	public stations: any = [];
	public message: string;

	constructor(private homeService: HomeService) {
		this.message = 'Hello from HomeComponent constructor';
	}

	ngOnInit() {
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
