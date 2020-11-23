import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonService } from './shared/services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tiny-Scrum-Frontend';
  loadingSpninerHide = true;
  constructor(private commonSer: CommonService, private cdRef: ChangeDetectorRef){}
  ngOnInit(): void{
    this.commonSer.loadingSpinner.subscribe((data: boolean) => {
      this.loadingSpninerHide = data;
      this.cdRef.detectChanges();     
    });
  }
}
