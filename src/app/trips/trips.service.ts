import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Configuration } from './../app.constants';
import { AgmCoreModule } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  	private apiURL: string;

	httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/json'
	  })
	};
	
  	constructor(private http: HttpClient, private configuration: Configuration) {
  		this.apiURL = configuration.server + 'trips';
  	}

  	getTrips(source, destination) {
	    return this.http.get(this.apiURL + '?source=' + source + '&destination=' + destination)
	    .pipe(
	      retry(1),
	      catchError(this.handleError)
	    )
	}

	handleError(error) {
	     let errorMessage = '';
	     if(error.error instanceof ErrorEvent) {
	       // Get client-side error
	       errorMessage = error.error.message;
	     } else {
	       // Get server-side error
	       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
	     }
	     window.alert(errorMessage);
	     return throwError(errorMessage);
	}
}
