import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import{ environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
  loadingSpinner = new BehaviorSubject(false);
 
  constructor(private http: HttpClient) { }
  
  loadingSpinnerCall(val:any){
    this.loadingSpinner.next(val);
  }
 
}
