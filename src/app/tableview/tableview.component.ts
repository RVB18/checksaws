
import { Component } from '@angular/core';
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




@Component({
  selector: 'app-root',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})

export class TableviewComponent implements OnInit {
  displayedColumns = ['id', 'Name', 'Address', 'Mobile', 'Email','actions'];
  index: number;
  id: string;
  dataSource: MatTableDataSource<VendorData>;

  datap:any;
  coun:any;

  a=[]



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    @ViewChild('TABLE') table: ElementRef;


    dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;




         get data(): Issue[] {
           return this.dataChange.value;
         }

         getDialogData() {
           return this.dialogData;
         }



  constructor(public http: Http,
              public dialog: MatDialog,
            private _cookieService:CookieService,private router: Router) {

const users: VendorData[] = [];

                this.coun=0;



                var k= this.getCookie("idToken");
                                console.log(k+"venkat")

console.log(k)

                	let myHeaders = new Headers();
                	myHeaders.append('Content-Type', 'application/json');
                  myHeaders.append('Authorization',k)
                console.log(myHeaders)
                  let optionss = new RequestOptions({ headers: myHeaders });

                  this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',optionss).subscribe(data => {
                  console.log(data.json())


                  console.log("j")
                  this.datap=data.json()


                  this.datap=this.datap.body.data.Items;
                  console.log(this.datap)
                    for(var t=0;t<this.datap.length;t++){


                      users.push(this.datap[t])

                    }
                  console.log(users)

                    this.dataSource = new MatTableDataSource(users);

                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    //  console.log("sdfsd "+this.dataSource)


                  });




              }




              addIssue (issue: Issue): void {

            var b={id:uuid(),Name:issue.Name,Address:issue.Address,Mobile:issue.Mobile,Email:issue.Email}

            console.log(b)

                console.log(issue)
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





  ngOnInit() {

 console.log("hiiiii")





    //this.loadData();
    console.log("akkaqda ikkad")

//console.log(this.loadData)


}






  addNew(issue: Issue) {



    const dialogRef = this.dialog.open(AddComponent, {
      data: { }

    });




  }

  startEdit(i: number, id: string, Name: string, Address: string, Mobile: string, Email:string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(MattableeditComponent, {
      data: {id: id, Name: Name, Address: Address, Mobile: Mobile, Email: Email}
    });

    dialogRef.afterClosed().subscribe(result => {
    /*  if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);//
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[this.index] = this.dataService.getDialogData();
		console.log(this.dataService.getDialogData())
        // And lastly refresh table
        this.refreshTable();
		//window.location.reload
  }*/
    });
  }


  deleteItem(i: number, id: string, Name: string, Address: string, Mobile: string, Email:string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(MattabledeleteComponent, {
      data: {id: id, Name: Name, Address: Address, Mobile: Mobile,Email:Email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      //  const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
      //  this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      //  this.refreshTable();
      }
    });
  }



}
export function getdata(sheet){
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
  Address: string;
  Email: string;
  Mobile:string;

}
