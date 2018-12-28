import { Component,OnInit } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { Router } from '@angular/router';


import { CookieService } from 'angular2-cookie/core';

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
getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(private http: Http,private router: Router,private formBuilder: FormBuilder,private _cookieService:CookieService) {
this.config={}
this.myHeaders = new Headers();
var k= this.getCookie("idToken");
                console.log(k+"venkat")






  this.myHeaders.append('Authorization',k)
console.log("headu",this.myHeaders)




  this.options = new RequestOptions({ headers: this.myHeaders });
  console.log("ajji")

          this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',this.options).subscribe(data => {
      console.log(data.json())


this.vendor=data.json();
this.vendor=this.vendor.body.data.Items;


          });
  }
//




  onSubmit(f){
//console.log(f.value)
var sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": f.value.cheque, "id": "1234", "Name": f.value.name }
console.log(sett)

    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
      //console.log(data);
      console.log(data)
      alert("Succesfully Saved")
    //  window.open('/cheque')

  });
}
onvendorcreate(data){

//  console.log(data.value)
var date=new Date(data.value.Date)
var t=date.getMonth()+1
var ne=t+"/"+date.getDate()+"/"+date.getFullYear();

var f1={Name:data.value.Name,Date:data.value.Date,Amount:data.value.Amount,Carrername:data.value.Careern,Loadnumber:data.value.Loadnumber,id:uuid()}
console.log(f1)




  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',f1,this.options).subscribe(data => {
console.log(data.json())

  });

}



  ngOnInit() {
    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
    console.log(data.json())
    this.config=data.json()
    this.config=this.config.data.body.data.Items[0]

    });
}
}
