import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import '../polyfills';
import { UserService } from './services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FlashMessagesModule } from 'angular2-flash-messages';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


//import { UserrolesComponent } from './userroles/userroles.component'



//
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
MatTreeModule,

} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';
import { CookieModule } from 'ngx-cookie';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';

import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChequeslistComponent } from './chequeslist/chequeslist.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorchecksdetailsComponent } from './vendorchecksdetails/vendorchecksdetails.component';
import { SinglechequeprintComponent } from './singlechequeprint/singlechequeprint.component';
import { MulticheckComponent } from './multicheck/multicheck.component';
import { CommonModule } from '@angular/common';
import { Multicheck2Component } from './multicheck2/multicheck2.component';
import { TableviewComponent } from './tableview/tableview.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AddComponent} from'./add/add.component';
import {MattableeditComponent} from'./mattableedit/mattableedit.component';
import {MattabledeleteComponent} from './mattabledelete/mattabledelete.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { UserComponent } from './user/user.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ValidateFieldsSubmitFormComponent } from './validate-fields-submit-form/validate-fields-submit-form.component';
import { SnackBarComponentExampleComponent } from './snack-bar-component-example/snack-bar-component-example.component'
import { PizzaPartyComponent } from './snack-bar-component-example/snack-bar-component-example.component'
import { PizzaPartyyComponent } from './tableview/tableview.component'
import { PizzaPartyvComponent } from './vendor/vendor.component'
import { PizzaPartycComponent } from './chequeslist/chequeslist.component';
import { PizzaPartycsessionComponent } from './chequeslist/chequeslist.component';
import { PizzaPartyvsessionComponent } from './vendor/vendor.component'
import { PizzaPartyysessionComponent} from './tableview/tableview.component';
import { PizzaPartyaComponent} from './app.component';

import { PizzaPartyuComponent} from './user/user.component';
import { FormComponent } from './form/form.component';








@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
	MatTreeModule,
	MatTableModule ,
  ],
  declarations: [ ]
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    ChequeslistComponent,
    VendorComponent,
    VendorchecksdetailsComponent,
    SinglechequeprintComponent,
    MulticheckComponent, Multicheck2Component,LoginComponent,SignupComponent,TableviewComponent,AddComponent,MattableeditComponent,MattabledeleteComponent,UserrolesComponent,
    FieldErrorDisplayComponent,UserComponent,AdduserComponent,EdituserComponent,SnackbarComponent,ValidateFieldsSubmitFormComponent,SnackBarComponentExampleComponent,PizzaPartyComponent,PizzaPartyyComponent,PizzaPartyvComponent,PizzaPartyysessionComponent,PizzaPartyvsessionComponent,PizzaPartycComponent,PizzaPartycsessionComponent,PizzaPartyaComponent,PizzaPartyuComponent,FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
   MatNativeDateModule,
   FormsModule,
ReactiveFormsModule,
BrowserAnimationsModule,
CommonModule,
HttpModule,
NgbModule,
CookieModule.forRoot(),
 FlashMessagesModule.forRoot(),
 NgxLoadingModule.forRoot({
       animationType: ngxLoadingAnimationTypes.circle,
       backdropBackgroundColour: '#000000',
       backdropBorderRadius: '4px',
       primaryColour: '#000',
       secondaryColour: '#000',
       tertiaryColour: '#000'
   }),

 ],
  entryComponents:[
    AddComponent,
    MattableeditComponent,
    MattabledeleteComponent,
    UserComponent,
    AdduserComponent,
    EdituserComponent,
    SnackbarComponent,
     PizzaPartyComponent,
    PizzaPartyyComponent,
    PizzaPartyvComponent,
    PizzaPartyvsessionComponent,
    PizzaPartycComponent,
    PizzaPartycsessionComponent,
    PizzaPartyysessionComponent,
    PizzaPartyaComponent,
    PizzaPartyuComponent,
    FormComponent







  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
