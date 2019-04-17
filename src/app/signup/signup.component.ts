
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request,RequestMethod,Http,Response,Headers,ResponseType, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {MatSnackBar} from '@angular/material';



import * as $ from 'jquery';


import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    form: FormGroup;
c:any;
p:any;
e:any;
msgs:any;
mes:any;

emailforverify:any;

constructor(private http: Http, private router: Router, private route: ActivatedRoute,private httpService: HttpClient,private formBuilder: FormBuilder,private snackBar: MatSnackBar) { }







  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password:[null, Validators.required]




   })




}


    isFieldValid(field: string) {
      return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
      return {
        'has-error': this.isFieldValid(field),
        'has-feedback': this.isFieldValid(field)
      };
    }

    onSubmit(data) {
      console.log(data)
      console.log(this.form.value);
    




        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/signup',data)
        .subscribe (
        (res:Response) =>{
        var r=res.json();
        console.log(r)
       this.msgs=r;
        console.log(this.msgs)
        if(this.msgs.message=="failed"){


                                               this.snackBar.open(this.msgs.data,"Ok",{
                                                 duration:2000,
                                                 panelClass:'red-snackbar',
                                                 horizontalPosition: 'center',
                                                 verticalPosition: 'top'
                                               })


        //alert(this.msgs.data)


        console.log('form submitted');
      } else {



                                                       this.snackBar.open(this.msgs.data,"Ok",{
                                                         duration:2000,
                                                         panelClass:'green-snackbar',
                                                         horizontalPosition: 'center',
                                                         verticalPosition: 'top'
                                                       })



        this.validateAllFormFields(this.form);
        }
      })

    }

    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        console.log(field);
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }

    reset(){
      this.form.reset();
    }
  }
