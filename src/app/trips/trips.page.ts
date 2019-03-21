import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from './trips.service';
import { HomeService } from './../home/home.service';
import { Storage } from '@ionic/storage';

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
  public destn: any = [];
  public schedule: any = [];

  intervalId: number;

  public origin: any = { lat: 37.765062, lng: -122.419694 };
  public destination: any = { lat: 37.803768, lng: -122.271450 };

  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, private homeService: HomeService, private storage: Storage) { }

  ngOnInit() {

    this.storage.set('prev_selected_source', this.source);
    this.storage.set('prev_selected_dest', this.dest);
    this.storage.get('prev_selected_source').then((val) => {
      console.log('Your age is', val);
    });

  	this.source = this.activatedRoute.snapshot.paramMap.get('source');
  	this.dest = this.activatedRoute.snapshot.paramMap.get('dest');

    this.getTrips(); 
    this.getStationInfo(); 
    this.getDestStationInfo();

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
        this.getDirection();
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

  // Get source station info
  getDestStationInfo() {
    if(this.dest) {
      return this.homeService.getStation(this.dest).subscribe((data: {}) => {
        this.destn = data;
      })
    }
  }

  getDirection() {
    this.origin = { lat: parseFloat(this.station.gtfs_latitude), lng: parseFloat(this.station.gtfs_longitude) };
    this.destination = { lat: parseFloat(this.destn.gtfs_latitude), lng: parseFloat(this.destn.gtfs_longitude) };
    console.log(this.destination);
  }
}
