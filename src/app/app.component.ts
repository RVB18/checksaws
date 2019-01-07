import { Component,OnInit } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie';

import { v4 as uuid } from 'uuid';


import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  form: FormGroup;



  public list: string[] = [];
   public gen() {
     console.log( uuid());
     this.list.push(uuid());
   }
tt=[];
s=[];

msg:any;
  mat=[];
users:any
  data:any;
config:any;
vendor:any;
isDataAvailable:boolean = false;
myHeaders:any;
options:any;
showNav:boolean=false;
mdlSampleIsOpen : boolean = false;


getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(private http: Http,private router: Router,private formBuilder: FormBuilder,private _cookieService:CookieService) {
this.config={}
this.myHeaders = new Headers();
var k= this.getCookie("idToken");
                console.log(k)

                if(window.location.pathname=="/login"||window.location.pathname=="/signup"||window.location.pathname=="/"||window.location.pathname=="")
this.showNav=false
else
this.showNav=true





  this.myHeaders.append('Authorization',k)
console.log("headu",this.myHeaders)




  this.options = new RequestOptions({ headers: this.myHeaders });

          this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',this.options).subscribe(data => {
      console.log(data.json())


this.vendor=data.json();
this.vendor=this.vendor.body.data.Items;


          });
  }


  public openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;


  }


  onSubmit(f){
    var sett={}


    if(Object.keys(this.config).length==0){



     console.log(sett +"dfg")

     sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": uuid(), "Name": f.value.name }
}
    else{
sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": this.config.id, "Name": f.value.name }
}


    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
      console.log(data)
      alert("Succesfully Saved")

  });
}

createcheck(data){


var date=new Date(data.value.Date)
var t=date.getMonth()+1
var ne=t+"/"+date.getDate()+"/"+date.getFullYear();

var f1={Name:data.value.Name,Date:data.value.Date,Amount:data.value.Amount,Carrername:data.value.Careern,Loadnumber:data.value.Loadnumber,id:uuid()}
console.log(f1)




  this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',f1,this.options).subscribe(data => {
console.log(data.json())

  });

}

 isEmpty(arg) {
  for (var item in arg) {
    return false;
  }
  return true;
}


logout(){




this._cookieService.removeAll()
location.href='/login'

}
redirect(){
var port=4200
var consumerKey='Q0ypusZrhhgqsIbvnA1PNv2rleMwENKSvuY5GGbDS3kfskJ1Ho'

var bb=  "https://appcenter.intuit.com/connect/oauth2" +
     '?client_id=' + consumerKey +
     '&redirect_uri=' + 'http://localhost:4200/cheques'+
     '&scope=com.intuit.quickbooks.accounting' +
     '&response_type=code' +
     '&state=555ghjghj'
window.open(bb)
}
  ngOnInit() {

/*
if(this.getCookie("idToken"))
console.log("yup"  )
else
console.log("nope")*/


    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
    console.log(data.json())
    this.config=data.json()
    console.log(this.config.data.body.data.Items.length)
    if(this.config.data.body.data.Items.length==0&&this.getCookie("idToken"))
      this.mdlSampleIsOpen=true
  else
  this.config=this.config.data.body.data.Items[0]




    });



}
}
