



import { OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../models/issue';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})



export class AdduserComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdduserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Issue
          ,private _cookieService:CookieService,private http:Http) { }




  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {


    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :


        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {


    this.dialogRef.close();
  }

    getCookie(key:string){
        return this._cookieService.get(key);
      }

  public confirmAdd(): void {

console.log("gh")
    //
    var k= this.getCookie("idToken");
                    console.log(this.data)

                    //console.log(this.data.Firstname)

                    //console.log(this.data.email)

//console.log(this.data.password)

                    var b={
                        email:this.data.email,
                        password:uuid(),
                      firstname:this.data.firstname,
                      lastname:this.data.lastname,
                      phonenumber:"+91"+this.data.phonenumber

                    }

                    console.log(b)


    let myHeaders = new Headers();
    	myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization',k)
    console.log(myHeaders)
      let options = new RequestOptions({ headers: myHeaders });



        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',b,options).subscribe(data => {
          var data1=data.json();
          console.log(data.json())
          console.log(data1)



          if(data1.message="success"){

            console.log(data1.message)
          //  console.log("")
          //window.location.reload();

          }
          else
          alert("Unable to Create")
    console.log(data.json())

//
  })
}








                  ngOnInit() {







}
}
