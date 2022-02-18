import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { GenericResponseModel } from '../helpers/models/generic-response.model';

import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root',
})
export class ZipCodesService {

    private url = `${environment.apiURL}`;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
    };

    constructor( private http: HttpClient, private errorService: ErrorService ) { }

    // GET all the zip codes
    GET(): Observable<GenericResponseModel> {
        return this.http.get<GenericResponseModel>( `${this.url}/zipcodes` )
        .pipe(
            retry( 1 ),
            catchError( this.errorService.handleError ),
        );
    }

    // Get the selected zip code information
    GetByZipCode( zipCode: number ): Observable<GenericResponseModel> {
        return this.http.get<GenericResponseModel>( `${this.url}/zipcodes/${ zipCode }` )
        .pipe(
            retry( 1 ),
            catchError( this.errorService.handleError ),
        );
    }
}