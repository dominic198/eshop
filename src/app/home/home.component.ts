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
    let validurl = this.isUrlValid(this.myForm.value.url);
    if(!validurl){
      alert('Enter Valid Url');    
      this.myForm.reset();
      return;  
    }else{
      this.getScrapedData(this.myForm.value.url).subscribe((data:any) =>{    
        this.results = data.result;  
        this.showResults = true;
        this.myForm.reset();
      });
    }
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

  isUrlValid(userInput:string) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

}
