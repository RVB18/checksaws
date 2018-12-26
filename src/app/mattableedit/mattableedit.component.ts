


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component,OnInit, Inject} from '@angular/core';
import {DataService} from '../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-mattableedit',
  templateUrl: './mattableedit.component.html',
  styleUrls: ['./mattableedit.component.css']
})
export class MattableeditComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<MattableeditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService,private _cookieService:CookieService,private http:Http) { }

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
  //  this.dataService.updateIssue(this.data);




  var k= this.getCookie("idToken");
                  console.log(this.data)

var b={id:this.data.id,Name:this.data.Name,Address:this.data.Address,Mobile:this.data.Mobile,Email:this.data.Email}

  let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization',k)
  console.log(myHeaders)
    let options = new RequestOptions({ headers: myHeaders });


      this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,options).subscribe(data => {
  console.log(data.json())


})
//  this.dataService.addIssue(this.data);
}






    ngOnInit() {



    }
}
