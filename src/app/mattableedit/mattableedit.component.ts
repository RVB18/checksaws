


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component,OnInit, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-mattableedit',
  templateUrl: './mattableedit.component.html',
  styleUrls: ['./mattableedit.component.css']
})
export class MattableeditComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<MattableeditComponent>,
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

//


  var k= this.getCookie("idToken");

var b={id:this.data.id,Name:this.data.Name,StreetAddress:this.data.StreetAddress,CityorTown:this.data.CityorTown,State:this.data.State,zipcode:this.data.zipcode,Mobile:this.data.Mobile,Email:this.data.Email}
console.log(b)

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

       window.location.reload();
  }
        else
        alert("Unable to Update")
  console.log(data.json())


})
}






    ngOnInit() {



    }
}
