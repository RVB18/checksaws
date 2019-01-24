import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { UserService } from '../services/user.service';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-vendorchecksdetails',
  templateUrl: './vendorchecksdetails.component.html',
  styleUrls: ['./vendorchecksdetails.component.css']
})
export class VendorchecksdetailsComponent implements OnInit {
isLoading:boolean=false
  data:any;

config:any;
options:any;

  displayedColumns = [ 'ChequeID', 'Name', 'Date', 'Amount','Status','addr','Load','Carrer','Print'];
  dataSource: MatTableDataSource<UserData>;
  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  send(data){

	  console.log(data)
 var k =JSON.stringify(data);
 var num=data.Amount+""
 if(num.includes(".")){
 var dot=num .split(".")
 var doting=""
 if(dot[1].length==1)
 doting=dot[1]+"0"
 else
 doting=dot[1]
 var nu=convertNumberToWords(dot[0])+" and "+doting+"/100*****"
 var astreik="";
 var g1=5-dot[0].length

 while(g1>0){

 astreik+="*"


 g1--;
 }
 var tt=[]
  tt=[{count:1,words:nu,street:data.StreetAddress,postal:data.CityorTown+" "+data.State+" "+data.zipcode,date:data.Date,name:data.Name,amount:astreik+data.Amount,addr:data.Address,load:data.Loadnumber,carrer:data.Carrername}]
 //window.print("/multicheck?a="+JSON.stringify(tt), "_blank");
 var newString = JSON.stringify(tt).replace(/undefined/g," ");
 this.userdata.changeMessage(JSON.stringify(tt))
 this.userdata.changeMessage1(this.config)


 this.router.navigate(['/multicheck']);
 }
 else{

   var g1=5-num.length
   console.log("astreik "+g1)

   var astreik=""
   while(g1>0){

   astreik+="*"

   g1--;
   }
   console.log("astreik "+g1)
   var tt=[]
    tt=[{count:1,words:convertNumberToWords(data.Amount),street:data.StreetAddress,postal:data.CityorTown+" "+data.State+" "+data.zipcode,date:data.Date+"",name:data.Name,amount:astreik+data.Amount+".00",addr:data.Address,load:data.Loadnumber,carrer:data.Carrername}]

//    window.open("/multicheck?a="+JSON.stringify(tt), "_blank");

var newString = JSON.stringify(tt).replace(/undefined/g," ");
this.userdata.changeMessage(JSON.stringify(tt))
this.userdata.changeMessage1(this.config)


this.router.navigate(['/multicheck']);

 }







  }









  getCookie(key:string){
      return this._cookieService.get(key);
    }




  constructor(private route: ActivatedRoute,private http: Http,private router: Router,private _cookieService:CookieService,private userdata:UserService,private snackBar: MatSnackBar) {
    const users: UserData[] = [];
this.config={}
var name='';
    this.route.params.subscribe(params => {
       name = params['name']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
       console.log(name);

    });
    var k= this.getCookie("idToken");

        	let myHeaders = new Headers();
        	myHeaders.append('Content-Type', 'application/json');
          myHeaders.append('Authorization',k)
        console.log(myHeaders)
          this.options = new RequestOptions({ headers: myHeaders });
this.isLoading=true
    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',{Name:name},this.options).subscribe(data => {
      console.log(data.json());
      this.data=data.json();


this.isLoading=false

      if(this.data.message=="Unauthorized")
                            {

                              this.snackBar.open("Unauthorized","Ok",{
                                duration:2000,
                                panelClass:'red-snackbar',
                                horizontalPosition: 'center',
                                verticalPosition: 'top'
                              })



                              //alert("forbidden")
                              //window.location.href="/login"
                            }
                            else if(this.data.message=="The incoming token has expired"){

                              this.snackBar.open("Session Expired","Ok",{
                                duration:2000,
                                panelClass:'blue-snackbar',
                                horizontalPosition: 'center',
                                verticalPosition: 'top'
                              })


                            //  alert("Sorry Session Expired")
                              //window.location.href="/login"

                            }

    else{



          this.data=this.data.body.data.Items;

    console.log(this.data)

          for(var t=0;t<this.data.length;t++){
            users.push(this.data[t])

          }







          this.dataSource = new MatTableDataSource(users);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        //  console.log("sdfsd "+this.dataSource)

    }
        });

       }




  ngOnInit() {
    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
           //console.log(data);

this.config=data.json()
//this.config=this.config.body.data.Items[0]

console.log(this.config)

         });


//

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export interface UserData {
  ChequeID:string;
  Name: string;
  Amount: string;
  Date: string;
  Currentstatus: string;
  address:string;
  Loadnumber:string;
  Carrername:string;
  StreetAddress: string;
  zipcode:string;
  State:string;
  CityorTown:string;
}
//
export function  convertNumberToWords(amount:string) {
   var words = new Array();
   words[0] = '';
   words[1] = 'One';
   words[2] = 'Two';
   words[3] = 'Three';
   words[4] = 'Four';
   words[5] = 'Five';
   words[6] = 'Six';
   words[7] = 'Seven';
   words[8] = 'Eight';
   words[9] = 'Nine';
   words[10] = 'Ten';
   words[11] = 'Eleven';
   words[12] = 'Twelve';
   words[13] = 'Thirteen';
   words[14] = 'Fourteen';
   words[15] = 'Fifteen';
   words[16] = 'Sixteen';
   words[17] = 'Seventeen';
   words[18] = 'Eighteen';
   words[19] = 'Nineteen';
   words[20] = 'Twenty';
   words[30] = 'Thirty';
   words[40] = 'Forty';
   words[50] = 'Fifty';
   words[60] = 'Sixty';
   words[70] = 'Seventy';
   words[80] = 'Eighty';
   words[90] = 'Ninety';
   amount = amount.toString();
   var atemp = amount.split(".");
   var number = atemp[0].split(",").join("");
   var n_length = number.length;
   var words_string = "";
   if (n_length <= 9) {
       var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
       var received_n_array = new Array();
       for (var i = 0; i < n_length; i++) {
           received_n_array[i] = number.substr(i, 1);
       }
       for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
           n_array[i] = received_n_array[j];
       }
       for (var i = 0, j = 1; i < 9; i++, j++) {
           if (i == 0 || i == 2 || i == 4 || i == 7) {
               if (n_array[i] == 1) {
                   n_array[j] = 10 + n_array[j];
                   n_array[i] = 0;
               }
           }
       }
       var value = 0;
       for (var i = 0; i < 9; i++) {
           if (i == 0 || i == 2 || i == 4 || i == 7) {
               value = n_array[i] * 10;
           } else {
               value = n_array[i];
           }
           if (value != 0) {
               words_string += words[value] + " ";
           }
           if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Crores ";
           }
           if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Lakhs ";
           }
           if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Thousand ";
           }
           if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
               words_string += "Hundred and ";
           } else if (i == 6 && value != 0) {
               words_string += "Hundred ";
           }
       }
       words_string = words_string.split("  ").join(" ");
   }
   return words_string;
 }
