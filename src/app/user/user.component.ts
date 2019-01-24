




import { Component,Inject } from '@angular/core';
//import { UserService } from '../services/user.service';



import {DataSource} from '@angular/cdk/collections';

import { ElementRef, OnInit, ViewChild} from '@angular/core';
//import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from '../models/issue';
import {AdduserComponent} from '../adduser/adduser.component';
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


  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',

    duration: 10000000000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  closeResult: string;
  loading:boolean=false;
  isLoading:boolean=false;
  options:any;
//  data:any;



  displayedColumns = ['Email', 'Firstname','Last Name','Phonenumber','Username','actions'];
  index: number;
  id: string;
  dataSource: MatTableDataSource<VendorsData>;

  datap:any;
  coun:any;


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




           get data(): Issue[] {
             return this.dataChange.value;
           }

           getDialogData() {
             return this.dialogData;
           }













         /*get data(): Issue[] {
           return this.dataChange.value;
         }

         getDialogData() {
           return this.dialogData;
         }
*/
getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(public http: Http,
              public dialog: MatDialog,
            private _cookieService:CookieService,private router: Router,private snackBar: MatSnackBar) {

const users: VendorsData[] = [];

                this.coun=0;


//console.log(k)



var k= this.getCookie("idToken");
                console.log(k+"venkat")



                	let myHeaders = new Headers();
                	myHeaders.append('Content-Type', 'application/json');
                  myHeaders.append('Authorization',k)
                console.log(myHeaders)
                  let optionss = new RequestOptions({ headers: myHeaders });
this.isLoading=true


                  this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',optionss).subscribe(datas => {
                  console.log(datas.json())

this.isLoading=false
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
                  /*this.snackBar.openFromComponent(PizzaPartyuComponent, {
                    sasa: 'ggg',
                    ...this.configSuccess
                  });*/

                //  alert("forbidden")
                  //window.location.href="/login"
                }
                else if(this.datap.message=="The incoming token has expired"){
                //  alert("Sorry Session Expired")
                  window.location.href="/login"

                }

                else{


                this.datap=this.datap.data;




                console.log(this.datap)


                for(var tt=0;tt<this.datap.length;tt++)
                {
                  console.log(this.datap[tt])
              this.i=this.datap[tt]

                users.push(this.i)
                console.log(users)
              }


              this.dataSource = new MatTableDataSource(users);

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;


              }
                  /*for(var t=0;t<this.datap.length;t++){



                    users.push(this.datap[t])

                  }
                console.log(users)

                  this.dataSource = new MatTableDataSource(users);

                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  //  console.log("sdfsd "+this.dataSource)
}*/

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





  ngOnInit() {

 console.log("hiiiii")







    //this.loadData();
    console.log("akkaqda ikkad")

//console.log(this.loadData)


}
//

/*open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //this.closeResult = `Closed with: ${result}`;
    var em = (<HTMLInputElement>document.getElementById('email'));
    var pass = (<HTMLInputElement>document.getElementById('password'));


console.log(em.value)/*
    this.loading=true
        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',{Name:name},this.options).subscribe(data => {
          console.log(data.json());
          this.data=data.json();


    this.loading=false

          if(this.data.message=="Unauthorized")
                                {
                                  alert("forbidden")
                                  window.location.href="/login"
                                }
                                else if(this.data.message=="The incoming token has expired"){
                                  alert("Sorry Session Expired")
                                  window.location.href="/login"

                                }

        else{

export interface VendorData {
  id: string;
  Name: string;
  Email: string;
  Password:string;
  Value:string;

}




        }
            });





  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}*/




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



/*  startEdit(i: number, id: string, Name: string,Last Name:string,Email:string,Password:string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removeusernamed
    this.index = i;
    console.log("dscvs "+StreetAddress)
    const dialogRef = this.dialog.open(MattableeditComponent, {
      //data: {id: id, Name: Name, StreetAddress: StreetAddress,CityorTown:CityorTown,State:State,zipcode:zipcode, Mobile: Mobile, Email: Email}
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
  }
    });
  }


  deleteItem(i: number, id: string, Name: string,Last Name:string,Email:string,Password:string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(MattabledeleteComponent, {
    //  data: {id: id, Name: Name, Address: Address, Mobile: Mobile,Email:Email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      //  const foundIndex = this.exampleDatabase.datathis.datap[t]Change.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
      //  this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      //  this.refreshTable();
      }
    });
  }*/



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

export interface VendorsData {
  id: string;
  Email: string;
  Username:string;
  Lastname:string;
  Firstname:string;
  Phonenumber:string;

}



@Component({
  selector: 'user-snack',
  templateUrl: 'user-snack.html',
})
export class PizzaPartyuComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


}
