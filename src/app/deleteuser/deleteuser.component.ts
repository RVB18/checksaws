import { Component, OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';



@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})



export class DeleteuserComponent implements OnInit {

options:any;

getCookie(key:string){
    return this._cookieService.get(key);
  }
  constructor(public dialogRef: MatDialogRef<DeleteuserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private _cookieService:CookieService,private http:Http) {

              }





                onNoClick(): void {
                  this.dialogRef.close();
                }





            /*   confirmDelete(): void {



    var b={username:this.data.Username}

    console.log(b)

                              var k= this.getCookie("idToken");
console.log(k)
                              let myHeaders = new Headers();
                                myHeaders.append('Content-Type', 'application/json');
                                myHeaders.append('Authorization',k)

                                var options = new RequestOptions({ headers: myHeaders });
                                console.log(options)


                  this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser?username='+this.data.Username,b,options).subscribe(data => {
                    //window.location.reload();


                  console.log(data);
                })



              }*/

  ngOnInit() {
  }

}
