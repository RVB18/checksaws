import { Component, OnInit,ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';


import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
isLoading:boolean=false
  map:any;
  data:any;
datac:any;

  displayedColumns = [ 'Name', 'Pending Amount', 'Paid Amount','View'];
  dataSource: MatTableDataSource<UserData>;
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  go(name){

    console.log("event started "+JSON.stringify(name))
    this.router.navigate(['/vendorcheckdetails', name.Name]);

  }

  getCookie(key:string){
      return this._cookieService.get(key);
    }


  constructor(private http: Http,private router: Router,private _cookieService:CookieService) {
    // Create 100 users
    const users: UserData[] = [];
    //  for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    this.map = new Map();

    // Assign the data to the data source for the table to render

    var k= this.getCookie("idToken");
                    console.log(k+"venkat")




    	let myHeaders = new Headers();
    	myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization',k)
    console.log(myHeaders)
      let options = new RequestOptions({ headers: myHeaders });
this.isLoading=true
    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/changecheckstatus',options).subscribe(data => {
      this.datac=data.json();
console.log(this.datac)
this.isLoading=false





              if(this.datac.message=="Unauthorized")
              {
                alert("forbidden")
                window.location.href="/login"
              }
              else if(this.datac.message=="The incoming token has expired"){
                alert("Sorry Session Expired")
                window.location.href="/login"

              }

else{
  this.datac=this.datac.body.finaldata;
  for(var t=0;t<this.datac.length;t++){
    users.push(this.datac[t])

  }
  console.log(users)

  this.dataSource = new MatTableDataSource(users);

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
//  console.log("sdfsd "+this.dataSource)

}
}); }

  ngOnInit() {



}//


applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

}



export interface UserData {
  Name: string;
  Pending: string;
  Paid: string;

}
