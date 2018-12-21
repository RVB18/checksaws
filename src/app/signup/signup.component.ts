






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

constructor(private http: Http, private router: Router, private route: ActivatedRoute,private httpService: HttpClient,private formBuilder: FormBuilder) { }



verify=function(data)
{
  //this.x=document.getElementById("verifys").value;
 // /conform/:verificationcode'

  //console.log(this.x)
  var baka={



	"email":this.emailforverify,

	"vcode":data.verify

  }
  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/verification',baka)
.subscribe (
  (res:Response) =>{
  var r=res.json();
  console.log(r)
this.mes=r;
console.log(this.mes)

//this.router.navigate(['/login'])

})
}
 signup=function(data)

//

{
console.log(data.email + "   "+data.password)
var t={


	"email":data.email,

	"password":data.password
}
this.emailforverify=data.email
this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/signup',t)
.subscribe (
(res:Response) =>{
var r=res.json();
console.log(r)
/*this.msgs=r;
console.log(this.msgs)
if(this.msgs.message="failed")
alert(this.msgs.data)
console.log(this.msgs.data)
*/
})
//
//this.router.navigate(['/login'])

}




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

        this.http.post('https://6ggpglz69a.execute-api.ap-south-1.amazonaws.com/prod/signup',this.form.value)
        .subscribe (
        (res:Response) =>{
        var r=res.json();
        console.log(r)
        /*this.msgs=r;
        console.log(this.msgs)
        if(this.msgs.message="failed")
        alert(this.msgs.data)
        console.log(this.msgs.data)
        */
        })
        console.log('form submitted');
      } else {
        this.validateAllFormFields(this.form);
      }
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
//




    /*  this.http.get('https://bqvf7yj8s8.execute-api.ap-south-1.amazonaws.com/prod')
          .subscribe(
            res => {
              var a=res.json
              console.log(a)
            },
            err => {
              console.log("error")
            }
          );*/




































/*const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'mode':'cors',
    'dataType':'jsonp',
    'method':'get'
  })
}*/


















              /* $.ajax({
                   mode :'cors',
                   method: 'GET',
                   dataType: 'jsonp',

                 'Access-Control-Allow-Origin':true,

                   cache: false,
                   contentType: "application/json; charset=utf-8",

                   url:'https://wgf8pxxe39.execute-api.us-west-2.amazonaws.com/v1/signup?email=gaddam.venkat7@gmail.com&password=sevenhills7',
                   success: function (response) {
                       try {
                           var output = JSON.parse(response);
                           console.log(output);
                       } catch (e) {
                           console.log("Output is not valid JSON: " + data);
                       }
                   }, error: function (request, error) {
                       console.log("AJAX Call Error: "+error);
                   }

               });*/



              /* $(document).ready(function () {

               $.ajax({
    url: 'https://wgf8pxxe39.execute-api.us-west-2.amazonaws.com/v1/signup?email=gaddam.venkat7@gmail.com&password=sevenhills7',
    mode :'cors',
    method: 'GET',
    dataType: 'jsonp',
    cache: false,

    contentType: "application/json; charset=utf-8",

    success: function (data) {
        try {
            var output = JSON.parse(data);
            alert(output);
        } catch (e) {
            alert("Output is not valid JSON: " + data);
        }
    }, error: function (response) {
        alert("AJAX Call Error: " + error);
    }
});
});*/
