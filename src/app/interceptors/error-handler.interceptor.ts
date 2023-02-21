import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { off } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar:MatSnackBar,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err=> {
        if(err.status==HttpStatusCode.Unauthorized)
        {
          this.snackBar.open("Invalid Credential","X",{
            horizontalPosition: 'center',
            verticalPosition:'top',
           })
        }else if(err.status==HttpStatusCode.Forbidden){
          this.snackBar.open("You do not have access to the resourse you are looking for","X",{
            horizontalPosition: 'center',
            verticalPosition:'top',
           })
        }else if(err.status==HttpStatusCode.UnprocessableEntity){
          
          this.snackBar.open(  err.error,"X",{
            horizontalPosition: 'center',
            verticalPosition:'top',
           })
        
        }else {
          
          this.snackBar.open(  err.message,"X",{
            horizontalPosition: 'center',
            verticalPosition:'top',
           })
        
        }
        
        return throwError(() => new Error(err))})
      )

  }
}
