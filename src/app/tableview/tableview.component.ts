
import { Component , Inject} from '@angular/core';
//import { UserService } from '../services/user.service';



import {DataSource} from '@angular/cdk/collections';

import { ElementRef, OnInit, ViewChild} from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from '../models/issue';
import {AddComponent} from '../add/add.component';
import { MattableeditComponent } from '../mattableedit/mattableedit.component';
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


@Component({
  selector: 'app-root',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})

export class TableviewComponent implements OnInit {


  displayedColumns = ['Name', 'Street','City','State','Zipcode', 'Mobile', 'Email','actions'];
  index: number;
  id: string;
  dataSource: MatTableDataSource<VendorData>;
options:any;
  datap:any;
  loading:boolean=false;
  coun:any;
  existdata:any;

  a=[]

isLoading=false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    @ViewChild('TABLE') table: ElementRef;

    @ViewChild('closeadd') closeadd: ElementRef;
    @ViewChild('closeedit') closeedit: ElementRef;

    @ViewChild('closedel') closedel: ElementRef;

    dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;

     users: VendorData[] = [];



         get data(): Issue[] {
           return this.dataChange.value;
         }

         getDialogData() {
           return this.dialogData;
         }



  constructor(public http: Http,
              public dialog: MatDialog,
            private _cookieService:CookieService,private router: Router,private snackBar: MatSnackBar) {


                this.coun=0;
                this.existdata={}



                var k= this.getCookie("idToken");
                                console.log(k+"venkat")

console.log(k)

                	let myHeaders = new Headers();
                	myHeaders.append('Content-Type', 'application/json');
                  myHeaders.append('Authorization',k)
                console.log(myHeaders)
                  this.options = new RequestOptions({ headers: myHeaders });
this.refreshdata()



              }
refreshdata(){

this.users=[]
this.dataSource = new MatTableDataSource(this.users);

this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
  this.isLoading=true
                    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',this.options).subscribe(data => {
                    console.log(data.json())

  this.isLoading=false
                    console.log("j")
                    this.datap=data.json()


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





                                         this.snackBar.open("Session Expired","Ok",{
                                           duration:2000,
                                           panelClass:'blue-snackbar',
                                           horizontalPosition: 'center',
                                           verticalPosition: 'top'
                                         })

                  }

                  else{

                  this.datap=this.datap.body.data.Items;
                  console.log(this.datap)
                    for(var t=0;t<this.datap.length;t++){


                      this.users.push(this.datap[t])

                    }

                    this.dataSource = new MatTableDataSource(this.users);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    //  console.log("sdfsd "+this.dataSource)
  }

                  });
}



              addIssue (issue: Issue): void {

          //  var b={id:uuid(),Name:issue.Name,Address:issue.Address,Mobile:issue.Mobile,Email:issue.Email}

          //  console.log(b)

                console.log("sdvds "+issue)
}




                getCookie(key:string){
                    return this._cookieService.get(key);
                  }



                  applyFilter(filterValue: string) {
                     filterValue = filterValue.trim(); // Remove whitespace
                     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
                     this.dataSource.filter = filterValue;
                   }

ExportTOExcel()
{
	//console.log(this.table.nativeElement)
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
   console.log(ws)
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

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //console.log(ws["A"])

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');

}


/*openSnackBar() {
  this.snackBar.openFromComponent(PizzaPartyyComponent, {
    sasa: 'fhkjsghdfj;hsfjl;hj;dfgjsgsjkgfjksfdg',
    ...this.configSuccess
  });
}*/


  ngOnInit() {

 console.log("hiiiii")





    //this.loadData();
    console.log("akkaqda ikkad")

//console.log(this.loadData)


}




addnew(data){
  this.closeadd.nativeElement.click();
this.loading=true
var b={id:uuid(),Name:data.Name,StreetAddress:data.StreetAddress,CityorTown:data.CityorTown,State:data.State,zipcode:data.zipcode,Mobile:data.Mobile,Email:data.Email}

console.log(data)



      this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,this.options).subscribe(data => {
        this.loading=false
        var data1=data.json();
        console.log(data1)
        if(data1.message="success"){
        //  console.log("")
      //  window.location.reload();
      this.refreshdata()


        }
        else
        alert("Unable to Create")
  console.log(data.json())


})
}
selectedrow(row){

this.existdata=row
console.log(this.existdata)

}

  edit(data){

    this.isLoading=true
    this.closeedit.nativeElement.click();
    var b={id:this.existdata.id,Name:data.Name,StreetAddress:data.StreetAddress,CityorTown:data.CityorTown,State:data.State,zipcode:data.zipcode,Mobile:data.Mobile,Email:data.Email}
    console.log(b)


          this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',b,this.options).subscribe(data => {
            var data1=data.json();
            this.isLoading=false

            console.log(data1)
            if(data1.message="success"){
            console.log("done")

        //   window.location.reload();
      }
            else
            alert("Unable to Update")
      console.log(data.json())


    })
  }

  del() {
    this.loading=true
this.closedel.nativeElement.click()
                      this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor?id='+'"'+this.existdata.id+'"',this.options).subscribe(data => {
                        this.loading=false
    this.refreshdata()
                    })
  }



}
export function getdata(sheet){
   var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = XLSX.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = []; this.snackBar.open("Unauthorized","Ok",{
                                         duration:2000,
                                         panelClass:'red-snackbar',
                                         horizontalPosition: 'center',
                                         verticalPosition: 'top'
                                       })
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
};

export interface VendorData {
  id: string;
  Name: string;
  StreetAddress: string;
  CityorTown: string;
  State: string;
  zipcode: string;
  Email: string;
  Mobile:string;

}

/*
@Component({
  selector: 'tableview-snack',
  templateUrl: 'tableview-snack.html',
})
export class PizzaPartyyComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


}


@Component({
  selector: 'tableview-session',
  templateUrl: 'tableview-session.html',
})
export class PizzaPartyysessionComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


}*/
