import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-mattabledelete',
  templateUrl: './mattabledelete.component.html',
  styleUrls: ['./mattabledelete.component.css']
})
export class MattabledeleteComponent implements OnInit {

options:any;
  constructor(public dialogRef: MatDialogRef<MattabledeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private _cookieService:CookieService,private http:Http) {

              }


              getCookie(key:string){
                  return this._cookieService.get(key);
                }


                onNoClick(): void {
                  this.dialogRef.close();
                }





                confirmDelete(): void {


                                  console.log(this.data)
                              var k= this.getCookie("idToken");

                              let myHeaders = new Headers();
                                myHeaders.append('Content-Type', 'application/json');
                                myHeaders.append('Authorization',k)

                                var options = new RequestOptions({ headers: myHeaders });


                  this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor?id='+this.data.id,options).subscribe(data => {
                  ///  window.location.reload;


                  console.log(data);
                })



                }

  ngOnInit() {
  }

}
