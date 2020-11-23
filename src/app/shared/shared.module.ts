import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbTooltipModule, NgbNavModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [ErrorMessageComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    LoadingSpinnerComponent,
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbModule
  ] 
})
export class SharedModule { }
