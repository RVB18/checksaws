


import { Component, ViewChild , ElementRef, OnInit ,Injectable} from '@angular/core';
import {MatTableDataSource,MatPaginator, MatSort,} from '@angular/material';

import { Router } from '@angular/router';

import { v4 as uuid } from 'uuid';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { CookieService } from 'angular2-cookie/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-chequeslist',
  templateUrl: './chequeslist.component.html',
  styleUrls: ['./chequeslist.component.css']
})
export class ChequeslistComponent implements OnInit  {
  public loading = false;

config:any;
datap:any;
datak:any;
  data:any;
  map:any;
	count:any;
  coun:any;
  options:any;
  displayedColumns = [ 'chequeid', 'Name', 'Date', 'Amount','Status','Address','LoadNo','Carrer'];
  dataSource: MatTableDataSource<UserData>;
  //
  mdlSampleIsOpen : boolean = false;
del:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  /*highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }*/
  private openModal(open : boolean) : void {
   this.mdlSampleIsOpen = open;
 //this.router.navigate(['/cheques']);
 var deletedata=[]
 if(open==true){

   this.map.forEach((value, key) => {
deletedata.push({id:value.id,name:value.Name,date:value.Date,load:value.Loadnumber})


   })
   this.del=deletedata;


 }

}

  constructor(private http: Http,private router: Router,private _cookieService:CookieService,private userdata:UserService) {
    const users: UserData[] = [];
    //  for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
this.coun=0;
    // Assign the data to the data source for the table to render
//
var k= this.getCookie("idToken");
                console.log(k+"venkat")




	let myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization',k)
console.log(myHeaders)
  let options = new RequestOptions({ headers: myHeaders });

this.options=options;
    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',options).subscribe(data => {
console.log(data.json())

   this.datap=data.json()
this.datap=this.datap.body.data.Items;

      for(var t=0;t<this.datap.length;t++){
        users.push(this.datap[t])

      }
console.log("getting "+users)

      this.dataSource = new MatTableDataSource(users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //  console.log("sdfsd "+this.dataSource)


    });
  }


  deleteitems(items){

	  var dele=[];
	 this.mdlSampleIsOpen=false;


	  for(var t=0;t<items.length;t++){

		  		  	dele.push(items[t].id)




	  }

		  var fp={id:dele}
      console.log(fp)
		  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/mchequedel',fp,this.options).subscribe(data => {
  console.log(data.json())
window.location.reload()

    });


  }

  handleFileSelect(e)
    {
      var filedata=[];
  var filedate2=[];
      var file = (<HTMLInputElement>document.getElementById('filePicker'));
    //  var jsonFile = this.csvJSON(file);

      //console.log(jsonFilefile)
      const reader = new FileReader();
   reader.onload = () => {
     var text = reader.result.toString();
     console.log('CSV: ', text);
     var lines = text.split("\n");

     var result = [];

     var headers = lines[0].split(",");

     for (var i = 1; i < lines.length; i++) {

         var obj = {};
         var currentline = lines[i].split(",");

         for (var j = 0; j < headers.length; j++) {
             obj[headers[j]] = currentline[j];
         }

         result.push(obj);

     }
     //convert text to json here
     //var json = this.csvJSON(text);
     console.log(JSON.stringify(result.pop()))
  /*   result.forEach(function(ele){
     console.log(ele.Name+ele.Amount)

   })*/
   result.forEach(function(ele){
     console.log(ele.Name)
    var m={

       "Amount": ele.Amount,
          "Carrername":ele.CarrerName,
          "Date": ele.Date,
          "id": uuid(),
          "Loadnumber": ele.LoadNumber,
          "Name": ele.Name,
          "StreetAddress":ele.StreetAddress,
          "CityorTown": ele.CityorTown,
          "State":ele.State,
          "zipcode": ele.zipcode,
          "Country": ele.Country,

  }

  filedata.push(m)
  //this.filedata.push(m);
  //console.log(filedata)
  })

  console.log(filedata)
  this.loading=true
   var url='https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/csvupload'
   if(filedata.length>0){
      this.http.post(url,{"Items":filedata},this.options).subscribe (

       (res:Response) =>{
         this.loading=false

         console.log("success "+JSON.stringify(res));

  }
  )
  }
  else
  console.log("sorry file is empty....")
   };





   reader.readAsText(file.files[0]);

  }









  updatestatus(data){
var idmap='';


	  console.log(data.value.to +"sdfgs "+this.config.Chequenumber)
	  var gh=0;
	  //{from: "236", to: "249"}
	  if(data.value.to==this.config.Chequenumber){
		  gh=0
	  }
	  else{
	  gh=parseInt(data.value.to)-parseInt(this.config.Chequenumber)
	  }
	  console.log(this.config.Chequenumber+"  checking "+gh)
	//  var po=parseInt(data.value.to)-parseInt(data.value.from)

	  for(var t=0;t<=gh;t++){
		  console.log(this.count[t].id)



		  	idmap+="'"+this.count[t].id+"',"

 	  }
	  idmap = idmap.slice(0, -1); // "12345.0"


console.log(idmap)
if(gh==0)
	gh=1
else
	gh++
  this.http.get('http://13.232.165.2:3000/statusupdates?a='+idmap).subscribe(data => {
      console.log(data);
      this.datak=data
      this.datak=this.datak.data;


this.http.get('http://alektasolutions.com/connected/chequeupdate?a='+gh).subscribe(data => {
      console.log(data);
      //this.data=data.data;

window.location.reload();

    });
    });
  }




  highlightedRows(row){
      //  if(hash)
//

      var a=row.id



      console.log(a)
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


this.router.navigate(['/multicheck']);
//window.open("http://alektasolutions.com/purchase/print/cheques/ang?a="+JSON.stringify(a), "_blank");

//this.router.navigate(['/multicheckmulticheck',a])
      }

  public changeListener(){


    var filedata=[];
    var filedate2=[];
        var file = (<HTMLInputElement>document.getElementById('filePicker'));
      //  var jsonFile = this.csvJSON(file);
        //console.log(jsonFilefile)
        const reader = new FileReader();
     reader.onload = () => {
       var text=""
      // text = reader.result;
       console.log('CSV: ', text);
       var lines = text.split("\n");
       var result = [];
       var headers = lines[0].split(",");
       for (var i = 1; i < lines.length; i++) {
           var obj = {};
           var currentline = lines[i].split(",");
           for (var j = 0; j < headers.length; j++) {
               obj[headers[j]] = currentline[j];
           }
           result.push(obj);
       }
       //convert text to json here
       //var json = this.csvJSON(text);
       console.log(JSON.stringify(result.pop()))
    /*   result.forEach(function(ele){
       console.log(ele.Name+ele.Amount)
     })*/
     result.forEach(function(ele){
       console.log(ele.Name)
      var m={
         "Amount": ele.Amount,
            "Carrername":ele.CarrerName,
            "Date": ele.Date,
            "id": uuid(),
            "Loadnumber": ele.LoadNumber,
            "Name": ele.Name,
            "StreetAddress":ele.StreetAddress,
            "CityorTown": ele.CityorTown,
            "State":ele.State,
            "zipcode": ele.zipcode,
            "Country": ele.Country,
    }
    filedata.push(m)
    //this.filedata.push(m);
    //console.log(filedata)
    })
    console.log(filedata)
     var url='https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/csvupload'
     if(filedata.length>0){
        this.http.post(url,{"Items":filedata}).subscribe (
         (res:Response) =>{
           console.log("success "+JSON.stringify(res));
    }
    )
    }
    else
    console.log("sorry file is empty....")
     };
     reader.readAsText(file.files[0]);

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
