import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  constructor() { }

  // Error handling
  handleError( error: any ) {
    let errorMessage = '';
    if ( error.error instanceof ErrorEvent ) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `<strong>Error:</strong> ${ error.status } <br> <strong>Causa:</strong> ${ error.error.msg }`;
    }

    Swal.fire({
      html: `<strong>${ error.statusText }</strong><hr>${ errorMessage }`,
      imageUrl: '../../assets/images/logo.png',
      imageWidth: 193,
      imageHeight: 100,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    }).then( res => {
      if ( res.value ) {
        if ( error.statusText === 'Forbidden') {
          window.history.back();
        }
      }
    });
    return throwError( errorMessage );
  }

  // show alert to the user
  showAlertError( title: string, msg: any ) {
    Swal.fire({
      title: title,
      text: msg,
      icon: 'error',
      showConfirmButton: true,
    });
  }
}