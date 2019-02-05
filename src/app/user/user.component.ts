import { Component,Inject } from '@angular/core';
//import { UserService } from '../services/user.service';



import {DataSource} from '@angular/cdk/collections';

import { ElementRef, OnInit, ViewChild} from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from '../models/issue';
import {AdduserComponent} from '../adduser/adduser.component';
import { DeleteuserComponent } from '../deleteuser/deleteuser.component';
import { EdituserComponent } from '../edituser/edituser.component'
//import { MattableeditComponent } from '../mattableedit/mattableedit.component';
import { MattabledeleteComponent } from '../mattabledelete/mattabledelete.component';
import {map} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../services/user.service';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';


import { v4 as uuid } from 'uuid';


import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

 import * as XLSX from 'xlsx';

import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';


import { CookieService } from 'ngx-cookie';


import {MatSnackBar} from '@angular/material';
import {  MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material';




import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  FormControl
} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

editdata:any;
  closeResult: string;
  loading:boolean=false;
  isLoading:boolean=false;
  //options:any;
//  data:any;

optionss:any;

  displayedColumns = ['Email','Firstname','Last Name','Phonenumber','actions'];
  index: number;
  id: string;
  //dataSource: MatTableDataSource<VendorsData>;

  dataSource :MatTableDataSource<Drivers>;

  driversdata: Drivers[] = [];

  datap:any;
  coun:any;

users=[];
  a=[]
  i:any

//isLoading=false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    @ViewChild('TABLE') table: ElementRef;


    dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;


    open(data) {
  this.editdata=data
  console.log(this.editdata)

  console.log(this.editdata.username)

      }

           get data(): Issue[] {
             return this.dataChange.value;
           }

           getDialogData() {
             return this.dialogData;
           }













getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(public http: Http,
              public dialog: MatDialog,
            private _cookieService:CookieService,private router: Router,private snackBar: MatSnackBar) {


this.editdata={}
const VendorsData = [];

                this.coun=0;


//console.log(k)



var k= this.getCookie("idToken");
                console.log(k+"venkat")




                	let myHeaders = new Headers();
                	myHeaders.append('Content-Type', 'application/json');
                  myHeaders.append('Authorization',k)
                console.log(myHeaders)
                  this.optionss = new RequestOptions({ headers: myHeaders });
this.isLoading=true

console.log(this.optionss)


                  this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',this.optionss).subscribe(datas => {
                  console.log(datas.json())

var s=datas.json();
/*s.data.forEach(function (ele){
  console.log(ele.username)
})
*/this.isLoading=false
                  console.log("j")
                  this.datap=datas.json()

                      console.log(this.datap)

                  if(this.datap.message=="Unauthorized")
                {



                                                         this.snackBar.open("Unauthorized","Ok",{
                                                           duration:2000,
                                                           panelClass:'red-snackbar',
                                                           horizontalPosition: 'center',
                                                           verticalPosition: 'top'
                                                         })

                }
                else if(this.datap.message=="The incoming token has expired"){
                //  alert("Sorry Session Expired")
                  window.location.href="/login"

                }

                else{


                this.datap=this.datap.data;






                for(var tt=0;tt<this.datap.length;tt++)
                {

                this.users.push(this.datap[tt])
              }

              console.log(this.users)

              this.dataSource = new MatTableDataSource(this.users);

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;


              }
                });



              }










ExportTOExcel()
{
	//console.log(this.table.nativeElement)
  //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
//const wb: XLSX.WorkBook = XLSX.utils.book_new();
   //console.log(ws)
  /* var head=[];
       var range = XLSX.utils.decode_range(ws['!ref']);
	   for(var R = range.s.r; R <= range.e.r; ++R) {
  for(var C = range.s.c; C <= range.e.c-1; ++C) {
    var cell_address = {c:C, r:R};
     if an A1-style address is needed, encode the address
    var cell_ref = XLSX.utils.encode_cell(cell_address);
	console.log(ws[cell_ref])
	head.push(ws[cell_ref])
  }
}*/

  //XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //console.log(ws["A"])

  /* save to file */
//  XLSX.writeFile(wb, 'SheetJS.xlsx');

}


oncreate(f){
var drivecreate={
  "feature": "driver_crud",
  "operation": "driver_create",
  "email": f.email,
  "password":f.password,
  "firstname": f.firstname,
  "lastname": f.lastname,
  "phonenumber":f.phonenumber,
  "driverid": uuid()
}


console.log(drivecreate)
this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',drivecreate,this.optionss).subscribe(data => {
//window.location.reload()
console.log(data)
})

}




onedit(f,data1){

  var driveredit={
    "feature": "driver_crud",
    "operation": "driver_update",
    "username":this.editdata.username,
    "email": f.email,
    "firstname": f.firstname,
    "lastname": f.lastname,
    "phonenumber":f.phonenumber,
    "driverid": uuid()
  }
console.log(driveredit)
  this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',driveredit).subscribe(data => {
  //window.location.reload()
  console.log(data)
  })


}

delete(f,data1){
console.log("sudheer")
  var del={

      "username":this.editdata.username,
  }
console.log(del)
var url='https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser?username='+this.editdata.username
console.log(url)
  this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser?username='+this.editdata.username,this.optionss).subscribe(data => {
  //window.location.reload()
  console.log(data)
  })


}







  ngOnInit() {

 console.log("hiiiii")







    //this.loadData();
    console.log("akkaqda ikkad")

//console.log(this.loadData)


}
//



stopEdit( i:number ,id:string,Username:string, Email: string,  Firstname: string,Lastname: string, Phonenumber:string, ) {

  console.log(Username)



  // index row is used just for debugging proposes and can be removed
  this.index = i;


  //console.log("dscvs "+StreetAddress)
  const dialogRef = this.dialog.open(EdituserComponent, {
    data: { Username:Username,Email: Email, Firstname:Firstname, Lastname: Lastname,Phonenumber:Phonenumber}

  })


  dialogRef.afterClosed().subscribe(result => {

  });
}



deleteItem(i: number, id: string,Username:string) {
  this.index = i;
  this.id = id;
  const dialogRef = this.dialog.open(DeleteuserComponent, {
    data: {Username:Username}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {

    }
  });
}








  addNew(issue: Issue) {



    const dialogRef = this.dialog.open(AdduserComponent, {
      data: { }

    });


//

}



                  applyFilter(filterValue: string) {
                     filterValue = filterValue.trim(); // Remove whitespace
                     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
                     this.dataSource.filter = filterValue;
                   }







}
/*export function getdata(sheet){
   var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = XLSX.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ],if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
};
*/


  export interface Drivers {
    email: string;
    password:string;
    firstname:string;
    lastname:string;
    phonenumber:string;
  }



/*
export interface VendorsData {
  email: string;
  password:string;
  firstname:string;
  lastname:string;
  phonenumber:string;


}*/
