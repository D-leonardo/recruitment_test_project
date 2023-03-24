import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppToastServiceService {

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



  success(message:String){
    this.Toast.fire({
      icon: 'success',
      title: message
    })
  }


  
  error(message:String){
    this.Toast.fire({
      icon: 'error',
      title: message
    })
  }
  
  warning(message:String){
    this.Toast.fire({
      icon: 'warning',
      title: message
    })
  }
  
  info(message:String){
    this.Toast.fire({
      icon: 'info',
      title: message
    })
  }
  
  question(message:String){
    this.Toast.fire({
      icon: 'question',
      title: message
    })
  }
  
}
