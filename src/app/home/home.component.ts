import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CommonService } from '../shared/services/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private fb: FormBuilder,private http: HttpClient, private commonService:CommonService) { }

  myForm: any;
  showResults: boolean = false;
  results: any = "";
  ngOnInit(): void {
    this.initForm();
  }
 

  initForm() {
    this.myForm = this.fb.group({
      url: ['', Validators.required]    
    });
  }

  submitForm(){   
    console.log(this.myForm.value.url)
    this.getScrapedData(this.myForm.value.url).subscribe((data:any) =>{
      console.log(data)
      this.results = data.result;  
      this.showResults = true;
    });
  }

  getScrapedData(siteUrl:any){
    let url = `http://localhost:4000/webscrap/getWebScrapusingcheerio`;
    return this.http.post(url,{"url":siteUrl}).pipe(
      map(data => {      
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    )
  }

}
