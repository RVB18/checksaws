import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import * as XLSX from 'xlsx';

import { Component, Directive, Input, ViewChild , ElementRef, OnInit ,Inject,Injectable} from '@angular/core';
import {MatTableDataSource,MatPaginator, MatSort,} from '@angular/material';

import { Router } from '@angular/router';

import { v4 as uuid } from 'uuid';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

//
import { CookieService } from 'ngx-cookie';
import { UserService } from '../services/user.service';

import {MatSnackBar} from '@angular/material';
import {  MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material';
//
@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit  {

  @ViewChild('closeupload') uploadclose: ElementRef;

  @ViewChild('closedel') closedel: ElementRef;

  modalReference = null;

  public loading = false;
  users: UserData[] = [];
  isLoading : boolean=false;
config:any;
datap:any;
datak:any;
  data:any;
  map:any;
	count:any;
  closeResult: string;
filevalue:any
  coun:any;
  options:any;
  displayedColumns = ['Index','Name','Load','Amount','Status','Date','Carrer','Cheque ID','Address'];
  dataSource: MatTableDataSource<UserData>;
  //
  mdlSampleIsOpen : boolean = false;
del:any;
arrayBuffer:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /*highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }*/
   extractselecteddata() {

 var deletedata=[]


   this.map.forEach((value, key) => {
deletedata.push({id:value.id,name:value.Name,date:value.Date,load:value.Loadnumber})


   })
   this.del=deletedata;


 }


//
  constructor(private modalService: NgbModal,private http: Http,private router: Router,private _cookieService:CookieService,private userdata:UserService,private snackBar: MatSnackBar) {
    //  for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
this.coun=0;
    // Assign the data to the data source for the table to render
//
var k= this.getCookie("idToken");
              //  console.log(k+"venkat")
//



	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization',k)
console.log(myHeaders)
  let options = new RequestOptions({ headers: myHeaders });
this.options=options;
this.loaddata();

  }
inform(file: HTMLInputElement){


this.filevalue=file.value

}

loaddata(){

  this.dataSource = new MatTableDataSource([]);

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.isLoading=true

      this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',this.options).subscribe(data => {
  //console.log(data.json())
     this.datap=data.json()
     console.log(this.datap)
     this.isLoading=false




     if(this.datap.message=="Unauthorized")
                     {



                                    /*     this.snackBar.openFromComponent(PizzaPartycComponent, {
                                           sasa: 'ggg',
                                           this.configSuccess
                                         });*/
                       //this.snackBar.open('forbidden', 'error', {duration: 10000});

                       //alert("forbidden")
                       //window.location.href="/login"

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


                      //this.snackBar.open('forbidden', 'error', {duration: 10000});

                       //alert("Sorry Session Expired")
                       //window.location.href="/login"

                     }

                     else{

  var m=[];
                     //console.log(this.datap)

                     //console.log(users)
var i=this.datap.Items.lengt;
                     this.datap.Items.forEach(function (ele){
                       i--;
                       var checkdata={
                         "Loadnumber":ele.Loadnumber,
                                            "Date":ele.Date,
                                            "CityorTown":ele.CityorTown,
                                            "timestamp":ele.timestamp,
                                            "Currentstatus":ele.Currentstatus,
                                            "State":ele.State,
                                            "StreetAddress":ele.StreetAddress,
                                            "zipcode":ele.zipcode,
                                            "Client":ele.Client,
                                            "Amount":ele.Amount,
                                            "Carrername":ele.Carrername,
                                            "Name":ele.Name,
                                            "id":ele.id,
                                            "chequeid":ele.chequeid,
                                            "index":i
                                          }


                                          m.push(checkdata)
                     })

  console.log(m)














                       this.dataSource = new MatTableDataSource(m);

                       this.dataSource.paginator = this.paginator;
                       this.dataSource.sort = this.sort;
                       //  console.log("sdfsd "+this.dataSource)
   }

                     });

}
  open(content) {
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
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
   }
  deleteitems(items){
this.closedel.nativeElement.click()
	  var dele=[];


	  for(var t=0;t<items.length;t++){

		  		  	dele.push(items[t].id)




	  }

		  var fp={id:dele}
      console.log(fp)
      this.loading=true
		  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/mchequedel',fp,this.options).subscribe(data => {
  var checksdata=data.json()
  console.log(checksdata)
  this.loading=false

  if(checksdata.message=="success"){
    //this.openModal(false)
    this.del=[];
this.loaddata()
}
else{

                       this.snackBar.open("Cannot be Deleted","Ok",{
                         duration:2000,
                         panelClass:'red-snackbar',
                         horizontalPosition: 'center',
                         verticalPosition: 'top'
                       })

}

//window.location.reload()

    });


  }

  handleFileSelect(e)
    {
     this.uploadclose.nativeElement.click();
//this.modalReference.close()
      var filedata=[];
  var filedate2=[];
      var file = (<HTMLInputElement>document.getElementById('filePicker'));
      document.getElementById("filePicker").innerHTML = "File choose";
    //  var jsonFile = this.csvJSON(file);

      //console.log(jsonFilefile)



      let fileReader = new FileReader();
             fileReader.onload = (e) => {
                 this.arrayBuffer = fileReader.result;
                 var data = new Uint8Array(this.arrayBuffer);
                 var arr = new Array();
                 for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                 var bstr = arr.join("");
                 var workbook = XLSX.read(bstr, {type:"binary",cellDates:true});
                 var first_sheet_name = workbook.SheetNames[0];
                 var worksheet = workbook.Sheets[first_sheet_name];
                 //console.log(bstr)

                // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
var bt=[]
bt=XLSX.utils.sheet_to_json(worksheet,{raw:true})
console.log(bt)
var tt=[];
//
  var top={}
  var amount=''
for(var l=0;l<bt.length;l++){
var ty=bt[l].Date
if (typeof ty === 'string' || ty instanceof String)
ty=bt[l].Date
else{
  var dd = ty.getDate()+1;

var mm = ty.getMonth()+1;
var yyyy = ty.getFullYear();
ty=mm+"/"+dd+"/"+yyyy
}
  amount=bt[l].Amount
  console.log("array "+l)
   top={Status:"NotSet",Name:bt[l].Name, Date:ty, Amount:  amount, LoadNumber:  bt[l].LoadNumber, CarrerName:  bt[l].CarrerName,State: bt[l].State,zipcode: bt[l].Zipcode,StreetAddress: bt[l].StreetAddress,Country:bt[l].Country,CityorTown:bt[l].CityorTown,id:uuid()}
tt.push(top)
//console.log({Name:bt[l].Name, Date:bt[l].Date, Amount:  bt[l].Amount, LoadNumber:  bt[l].LoadNumber, CarrerName:  bt[l].CarrerName,State: bt[l].State,zipcode: bt[l].zipcode,StreetAddress: bt[l].StreetAddress,Country:bt[l].Country,CityorTown:bt[l].CityorTown,id:uuid()})

}
console.log(tt)
//console.log(sheet2arr(worksheet))

                 this.loading=true


                   var url='https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/csvupload'

                     this.http.post(url,{"Items":tt},this.options).subscribe (

                       (res:Response) =>{
                         this.loading=false

                         console.log(res.json());
                         var uploadresponse=res.json()
                         if(uploadresponse.message=="success"){

                           this.snackBar.open("Succesfully Uploaded","Ok",{
                             duration:2000,
                             panelClass:'blue-snackbar',
                             horizontalPosition: 'center',
                             verticalPosition: 'top'
                           })
                           this.loaddata()
                                                        console.log(this.users)

                       }
                       else{

                                              this.snackBar.open("There is a Problem occured while Uploading File","Ok",{
                                                duration:2000,
                                                panelClass:'red-snackbar',
                                                horizontalPosition: 'center',
                                                verticalPosition: 'top'
                                              })       }

                  }
                )
                  }
                  fileReader.readAsArrayBuffer(file.files[0]);

             }



selectall(){

  console.log(this.dataSource.connect().value)
  for(var t=0;t<this.dataSource.connect().value.length;t++){

    this.highlightedRows(this.dataSource.connect().value[t])
  }

}


  highlightedRows(row){
      //  if(hash)
//
if(row.highlighted = !row.highlighted){}


      var a=row.id



      console.log(row)
      if(this.map.has(a))
        this.map.delete(a)
      else
      this.map.set(a,row)

      }



  getCookie(key:string){
      return this._cookieService.get(key);
    }



      g(){
console.log(this.map)
console.log(Object.keys(this.map).length)
var a=[]
this.map.forEach((value, key) => {
  this.coun++
  if(this.coun==4)
		  this.coun=1
var k=convertNumberToWords(value.Amount)
var num=value.Amount+""
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

  var mydate = new Date(value.Date);
   var t=mydate.getMonth()+1;

a.push({count:this.coun,street:value.StreetAddress,postal:value.CityorTown+" "+value.State+" "+value.zipcode,id:value.id,name:value.Name,date:value.Date,amount:astreik+value.Amount,words:nu,addr:value.Address,load:value.Loadnumber,carrer:value.Carrername})


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

  var mydate = new Date(value.Date);


   var t=mydate.getMonth()+1;
  a.push({count:this.coun,street:value.StreetAddress,postal:value.CityorTown+" "+value.State+" "+value.zipcode,id:value.id,name:value.Name,date:value.Date,amount:astreik+value.Amount+".00",words:k+ " and 00 cents",addr:value.Address,load:value.Loadnumber,carrer:value.Carrername})
}
});
/*var xdata=[];
	while(a.length>0){

	xdata.push({in:a.splice(0,3)})

getCookie(key:string){
      return this._cookieServicegetCookie(key:string){
    return this._cookieService.get(key);
  }
.get(key);
    }
	}
///	console.log(xdata)
a=xdata;*/
//
this.count=a

this.userdata.changeMessage(JSON.stringify(a))
this.userdata.changeMessage1(this.config)

if(a.length==0)
alert("Please Select atleast one Checks to Print")
else
this.router.navigate(['/multicheck']);
//window.open("http://alektasolutions.com/purchase/print/cheques/ang?a="+JSON.stringify(a), "_blank");

//this.router.navigate(['/multicheckmulticheck',a])
      }




  ngOnInit() {
    this.map = new Map();

	//getting config details


	     this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
              //console.log(data);

this.config=data.json()
//this.config=this.config.body.data.Items[0]

console.log(this.config)

            });


  }
//


  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
export interface UserData {
  id: string;
  Name: string;
  Date: string;
  StreetAddress: string;
  zipcode:string;
  State:string;
  CityorTown:string;
  Address:string;
  Loadnumber:string;
  Carrername:string;
  CurrentStatus:string;
  timestamp:string;
  Client:string
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
export function sheet2arr(sheet){
    var result = [];
    var json=[];
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
    console.log(result)
    for(var t=1;t<result.length;t++){
//     json.push({result[0][0]:result[t][0],result[0][1]:result[t][1],result[0][2]:result[t][2],result[0][3]:result[t][3],result[0][4]:result[t][4],result[0][5]:result[t][5]})
    //  json.push({result[0][0]:result[t][0]})
  //  console.log({result[0][0]:result[t][0]})
  json.push({Status:"NotSet",Name:result[t][0], Date:result[t][1], Amount:  result[t][2], LoadNumber:  result[t][3], CarrerName:  result[t][4],State: result[t][5],zipcode: result[t][6],StreetAddress: result[t][7],Country:result[t][8],CityorTown:result[t][9],id:uuid()})

    }
    return json;
 };

/*

 @Component({
   selector: 'chequelist-snack',
   templateUrl: 'chequelist-snack.html',
 })
 export class PizzaPartycComponent {
   constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


 }


 @Component({
   selector: 'chequelist-session',
   templateUrl: 'chequelist-session.html',
 })
 export class PizzaPartycsessionComponent {
   constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


 }*/
