import { OnInit } from '@angular/core';


import { CookieService } from 'ngx-cookie';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../models/issue';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})



export class AddComponent  implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
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


    //
    var k= this.getCookie("idToken");
                    console.log(this.data)

  var b={id:uuid(),Name:this.data.Name,Address:this.data.Address,Mobile:this.data.Mobile,Email:this.data.Email}

    let myHeaders = new Headers();
    	myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization',k)
    console.log(myHeaders)
      let options = new RequestOptions({ headers: myHeaders });


        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,options).subscribe(data => {
          window.location.reload();
    console.log(data.json())


  })
  }








                  ngOnInit() {







}
}
