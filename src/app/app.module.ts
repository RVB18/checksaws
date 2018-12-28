import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import '../polyfills';
import { ActivatedRoute, Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';


import { ValidateFieldsSubmitFormComponent } from './validate-fields-submit-form/validate-fields-submit-form.component';
import { CookieService } from 'angular2-cookie/core';
import { UserService } from './services/user.service';
import  {FlashhComponent} from './flashh/flashh.component';
import { FlashMessagesModule } from 'angular2-flash-messages';







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


} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


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
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UsersserviceComponent } from './usersservice/usersservice.component';




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
  ],
  declarations: []
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    ChequeslistComponent,
    VendorComponent,
    VendorchecksdetailsComponent,
    SinglechequeprintComponent,
    MulticheckComponent,ForgotpasswordComponent, Multicheck2Component,LoginComponent,SignupComponent,TableviewComponent,AddComponent,MattableeditComponent,MattabledeleteComponent,FieldErrorDisplayComponent,ValidateFieldsSubmitFormComponent,UsersserviceComponent,FlashhComponent
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
HttpClientModule,
HttpModule,
NgxSpinnerModule,

 FlashMessagesModule.forRoot(),

 NgxLoadingModule.forRoot({
       animationType: ngxLoadingAnimationTypes.chasingDots,
       backdropBackgroundColour: 'rgba(0,0,0,0.1)',
       backdropBorderRadius: '4px',
       primaryColour: '#ffffff',
       secondaryColour: '#ffffff',
       tertiaryColour: '#ffffff'
   })

  ],
  entryComponents:[
    AddComponent,
    MattableeditComponent,
    MattabledeleteComponent,
  ],
  providers: [CookieService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
