







import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
//mport {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { CookieService } from 'ngx-cookie';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

export class EdituserComponent  {


  constructor(public dialogRef: MatDialogRef<EdituserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private _cookieService:CookieService,private http:Http) { }

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




  stopEdit(): void {
console.log(this.data.Email)
console.log(this.data.Firstname)
console.log(this.data.Lastname)
console.log(this.data.Phonenumber)




    var b={password:uuid(),email:this.data.Email,firstname:this.data.Firstname,lastname:this.data.Lastname,phonenumber:this.data.Phonenumber}
    console.log(b)

    var k= this.getCookie("idToken");
                    console.log(this.data)


      let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization',k)
      console.log(myHeaders)
        let options = new RequestOptions({ headers: myHeaders });


          this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,options).subscribe(data => {
            var data1=data.json();
            console.log(data1)
            if(data1.message="success"){
            console.log("done")

          // window.location.reload();
      }
            else
            alert("Unable to Update")
      console.log(data.json())


    })


    //this.dataService.updateIssue(this.data);
  }





}
