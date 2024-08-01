import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }


  createSnackbar(type:string, message:string, duration: number= 4000): void {
    this.snackBar.open(message || '', '', {
      duration,
      panelClass: type
    });
  }

//   onClick(){
// Swal.fire({
//   position: "top-end",
//   icon: "success",
//   title: "Your work has been saved",
//   showConfirmButton: false,
//   timer: 1500
// });
//   }
}
