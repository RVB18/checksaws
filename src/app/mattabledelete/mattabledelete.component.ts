import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/data.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-mattabledelete',
  templateUrl: './mattabledelete.component.html',
  styleUrls: ['./mattabledelete.component.css']
})
export class MattabledeleteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<MattabledeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService,private _cookieService:CookieService,private http:Http) { }


                onNoClick(): void {
                  this.dialogRef.close();
                }

                getCookie(key:string){
                    return this._cookieService.get(key);
                  }



                confirmDelete(): void {
                  //this.dataService.deleteIssue(this.data.id);


                    var k= this.getCookie("idToken");
                                    console.log(this.data)

                  var b={id:this.data.id}

console.log(b)
                    let myHeaders = new Headers();
                      myHeaders.append('Content-Type', 'application/json');
                      myHeaders.append('Authorization',k)
                    console.log(myHeaders)
                      let options = new RequestOptions({ headers: myHeaders });
console.log(options)

                        this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,options).subscribe(data => {
                    console.log(data.json())


                  })


                }

  ngOnInit() {
  }

}
