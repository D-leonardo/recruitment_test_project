import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {

  constructor() { }

    Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


// Toast(Print) Success message
  success(message:String){
    this.Toast.fire({
      icon: 'success',
      title: message
    })
  }


  
// Toast(Print) Error message
  error(message:String){
    this.Toast.fire({
      icon: 'error',
      title: message
    })
  }
  

}
