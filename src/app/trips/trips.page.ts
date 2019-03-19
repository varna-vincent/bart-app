import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from './trips.service';
import { HomeService } from './../home/home.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  public source: string;
  public dest: string;

  public stations: any = [];
  public station: any = [];
  public schedule: any = [];

  intervalId: number;

  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, private homeService: HomeService) { }

  ngOnInit() {

  	this.source = this.activatedRoute.snapshot.paramMap.get('source');
  	this.dest = this.activatedRoute.snapshot.paramMap.get('dest');

  	this.intervalId = setInterval(() => { 
      this.getTrips(); 
      this.getStationInfo(); 
    }, 30000);
  }

  // Get trips list
  getTrips() {

    if(this.source && this.source && this.dest && this.dest && this.source !== this.dest) {
      return this.tripsService.getTrips(this.source, this.dest).subscribe((data: {}) => {
        this.schedule = data;
        // this.countdownService.initiateTimer(this.schedule.request.trip[0]['@origTimeMin']);
        // this.getDirection();
      })
    }
  }

  // Get source station info
  getStationInfo() {
    if(this.source) {
      return this.homeService.getStation(this.source).subscribe((data: {}) => {
        this.station = data;
        console.log(data);
      })
    }
  }
}
