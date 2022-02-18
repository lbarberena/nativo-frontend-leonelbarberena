import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ZipCodesModel } from 'src/app/helpers/models/zip-codes.model';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-zip-codes',
  templateUrl: './zip-codes.component.html',
  styleUrls: ['./zip-codes.component.scss']
})
export class ZipCodesComponent implements OnInit, OnDestroy {

  @Input() zipCode!: Observable<ZipCodesModel>; // Receive/listen the emitted event
  zipCodeSubscription!: Subscription; // will subscribe the model (data of the zip code)
  department: ZipCodesModel = { // Help us store the zip code data, initialize with dashes just for better look in html
    Department: '-',
    Municipality: '-',
    Neighbourhood: '-',
    zipCode: '-',
  };

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.fillData();
  }

  /* If the data is different from undefined will assign the data to department obj, otherwise will show an alert to the user */
  fillData() {
    this.zipCodeSubscription = this.zipCode.subscribe( res => {
      if ( res !== undefined ) {
        this.department = res;
      } else {
        this.errorService.showAlertError('ZIP Code not found', 'Try with one of the list');
        this.department = {
          Department: '-',
          Municipality: '-',
          Neighbourhood: '-',
          zipCode: '-',
        };
      }
    });
  }

  ngOnDestroy(): void {
      this.zipCodeSubscription.unsubscribe();
  }

}
