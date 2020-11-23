import { Injectable } from '@angular/core';
import { HttpHeaders, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from "rxjs";
import { CommonService } from '../services/common-service.service';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { ToastrCustomService } from '../services/toastr.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private route: Router,
    private commonService: CommonService,
    private toastService: ToastrCustomService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get("skip")) {
      this.commonService.loadingSpinnerCall(true)
    } else {
      if (req.headers.get("search") !== 'true') this.commonService.loadingSpinnerCall(true);
      const authorization = localStorage.getItem('authorization');
      if (!authorization) {
        // this.route.navigateByUrl('/login');
      } else {
        req = req.clone({
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
            'authorization': `Bearer ${authorization}`
          })
        });
      }
    }
    return next.handle(req).pipe(
      catchError((error:any) => {
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 400:     
                console.log(`Bad Request`);
                handled = true;
                break;
              case 401:     
                localStorage.removeItem('authorization')
                this.route.navigateByUrl("/");
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:    
                this.route.navigateByUrl("/");
                console.log(`redirect to login`);
                handled = true;
                break;
              case 404:     
                console.log(`Not Found Request`);
                handled = true;
                break;
              case 422:     
                console.log(`redirect to login`);
                handled = true;
                break;
              case 500:    
                console.log(`Server Error`);
                handled = true;
                break;
            }         
            if(error.status == 403){              
              if(error.error.message == 'Email id does not Exist'){
                this.toastService.loginEmailError("Please Enter Registered Email Id");
              }else{
                this.toastService.error(error); 
              }
            }else{
              this.toastService.error(error); 
            }           
          }
        }
        else {
          console.error("Other Unhandled Errors from server");
        }
        this.commonService.loadingSpinnerCall(false)
        if (handled) {
          console.log('return back: Error Handled successfully ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
      })
    )
  }
  
}
