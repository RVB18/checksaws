import { Component, OnInit,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { NgxSpinnerService } from 'ngx-spinner';


import { CookieService } from 'ngx-cookie';
import { FlashMessagesService } from 'angular2-flash-messages';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;
c:any;
p:any;
success:any

public showNav = true;

public loading = false;

constructor(private http: Http, private router: Router, private route: ActivatedRoute,private spinner: NgxSpinnerService,private formBuilder: FormBuilder,private _cookieService:CookieService,private _flashMessagesService: FlashMessagesService) {

this.showNav=true
 }




getCookie(key:string){
    return this._cookieService.get(key);
  }


  signup=function(data)
  {
    /*var data2=JSON.stringify(data)
    console.log(data2)
    this.c=data.email;
    this.p=data.password
console.log(this.c+this.p)*/
this.loading = true;




//
///
console.log(data)
this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/login',data)
.subscribe (
  (res:Response,err) =>{
    this.loading = false;
//

    if(err)
    {
    //  res.send(err)
    }
    var r=res.json();
    console.log(r)
    this.success=r
   if(this.success.message=="Failure")
   alert(this.success.data)
   else
   {


   }
   this.router.navigate(['/dashboard'])

/*	if(r.message=="Error")
alert(r.data.message)
else*/
//this.router.navigate(['/cheques'])

})
  }
//

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

    onSubmit() {

      console.log(this.form.value);
      if (this.form.valid) {
        console.log('form submitted');

        this.loading = true;




        //
        ///

        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/adminuserlogin',this.form.value)
        .subscribe (
          (res:Response) =>{
            this.loading = false;

            var r=res.json();
            console.log(r);


            this.success=r




           if(this.success.message=="Failure")

  this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 9991000});

           //alert(this.success.data)
           else
           {



             var i=r.data.idToken.jwtToken;
             this._cookieService.put("idToken",i);
             this._cookieService.put("email",this.form.value.email);

             console.log(this.form.value.email)

               var k= this.getCookie("idToken");
                               console.log(k+"venkat")


//this.router.navigate(['/dashboard'])
window.open("/dashboard","_self")

           }



        /*	if(r.message=="Error")
        alert(r.data.message)
        else*/
        //this.router.navigate(['/cheques'])

        })



      } else {
        this.validateAllFormFields(this.form);


              console.log(this.form)
      }
    }

    validateAllFormFields(formGroup: FormGroup) {


                    this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 9991000});


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
