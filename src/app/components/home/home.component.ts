import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subject } from 'rxjs';
import { ZipCodesModel } from 'src/app/helpers/models/zip-codes.model';
import { ErrorService } from 'src/app/services/error.service';
import { ZipCodesService } from 'src/app/services/zip-codes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zipCodes: string[] = [];
  zipCode = new FormControl();
  filteredOptions!: Observable<string[]>; // Used in the autocomplete

  // using Subject to emit the selected item to the child component (zip-codes.component.ts)
  selectedZipCode: Subject<ZipCodesModel> = new Subject<ZipCodesModel>();

  constructor(private zipCodesService: ZipCodesService,
              private errorService: ErrorService) { }

  ngOnInit(): void {
    this.initData();
    this.initFilter();
  }

  /* GET the zipcodes from the API, if there is an error, shows an alert to the user with the response msg */
  initData() {
    this.zipCodesService.GET().subscribe( res => {
      if ( res.success ) {
        const data = res.data;
        // The response will be an object, but the autocomplete does not read objs, so, fill an string array with the data
        data.forEach( (element: any) => {
          this.zipCodes.push( element.zipCode );
        });
      } else {
        this.errorService.showAlertError(res.msg, res.data);
      }
    });
  }

  // Init the autocomplete filter
  initFilter() {
    this.filteredOptions = this.zipCode.valueChanges
    .pipe(
      startWith(''),
      map( value => this._filter(value) )
    );
  }

  // Find zip codes that match the string from the input
  public _filter( value: string ): string[] {
    const filterValue = value.toLowerCase();
    return this.zipCodes.filter( codes => codes.toLowerCase().includes(filterValue));
  }

  // Get request for the zip code information, sending the selected code as parameter
  findByZipCode() {
    this.zipCodesService.GetByZipCode( this.zipCode.value ).subscribe( res => {
      if ( res.success ) {
        this.selectedZipCode.next( res.data ); // Emit an event to the child component (zip-codes.component.ts)
      } else {
        this.errorService.showAlertError(res.msg, res.data);
      }
    });
  }

}
