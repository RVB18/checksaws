import { Component,OnInit } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie';

import { v4 as uuid } from 'uuid';

import {MatSnackBar} from '@angular/material';

import { FlashMessagesService } from 'angular2-flash-messages';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
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
 hash:any;
msg:any;
  mat=[];
users:any
  data:any;
config:any;
vendor:any;
isDataAvailable:boolean = false;
loading:boolean = false;

myHeaders:any;
options:any;
showNav:boolean=false;
mdlSampleIsOpen : boolean = false;

Addresscomplete:any;
getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(private http: Http,private router: Router,private formBuilder: FormBuilder,private _cookieService:CookieService,private snackBar: MatSnackBar,private _flashMessagesService: FlashMessagesService) {
this.config={}
this.myHeaders = new Headers();
var k= this.getCookie("idToken");
                console.log(k)
this.hash={}
                if(window.location.pathname=="/login"||window.location.pathname=="/signup"||window.location.pathname=="/"||window.location.pathname=="")
this.showNav=false
else
this.showNav=true



this.Addresscomplete={}

  this.myHeaders.append('Authorization',k)
console.log("headu",this.myHeaders)




  this.options = new RequestOptions({ headers: this.myHeaders });

          this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',this.options).subscribe(data => {
      console.log(data.json())


this.vendor=data.json();
this.vendor=this.vendor.body.data.Items;
for(var t=0;t<this.vendor.length;t++){
this.hash[this.vendor[t].Name]=this.vendor[t]

}

console.log(this.hash)

          });
  }

completeAddress(){

  var name = (<HTMLInputElement>document.getElementById('Name'));

  this.Addresscomplete=this.hash[name.value]
  console.log(this.Addresscomplete)

}
  public openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;


  }















  onSubmit(f){
    var sett={}

    console.log(this.form);
    if (this.form.valid)

 this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-success', timeout: 1000});

    if(Object.keys(this.config).length==0){



     console.log(sett +"dfg")

     sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": uuid(), "Name": f.value.name }


            this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});

          //  this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-success', timeout: 1000});
                //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
                console.log('form submitted');


}
    else{
sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": this.config.id, "Name": f.value.name }


//this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
 this.validateAllFormFields(this.form);

       //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});




console.log(sett)
    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
      console.log(data)
      this.loading=false

       //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});

      //alert("Succesfully Saved")

  });

}
}



validateAllFormFields(formGroup: FormGroup) {

      this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
  Object.keys(formGroup.controls).forEach(field => {
    console.log(field);
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

reset(){
  this.form.reset();
}


//
createcheck(data){

console.log(data.value)
var date=new Date(data.value.Date)
var t=date.getMonth()+1
var ne=t+"/"+date.getDate()+"/"+date.getFullYear();

var f1={Name:data.value.Name,Date:data.value.Date,Amount:data.value.Amount,StreetAddress:data.value.StreetAddress,State:data.value.State,CityorTown:data.value.CityorTown,Country:data.value.Country,zipcode:data.value.zipcode,Carrername:data.value.Careern,Loadnumber:data.value.Loadnumber,id:uuid()}


this.loading=true


  this.http.put('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/cheque',f1,this.options).subscribe(data => {
var successdata=data.json()
console.log(successdata)
this.loading=false
if(successdata.message="success")

{
  //console.log(successdata.message)


  //this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-success', timeout: 1000});
  this.snackBar.open('Check created!', 'success', {duration: 5000});
//alert("check created")

//window.location.reload()
}
else {
//console.log(this.success.message);

//this.snackBar.open('Please Enter Valid Credentials', 'error', {duration: 5000});
//alert("There is a problem in creating a check")
}
});

}




logout(){




this._cookieService.removeAll()
location.href='/login'

}
redirect(){
var port=4200
var consumerKey='Q0ypusZrhhgqsIbvnA1PNv2rleMwENKSvuY5GGbDS3kfskJ1Ho'
console.log(window.location)
var bb=  "https://appcenter.intuit.com/connect/oauth2" +
     '?client_id=' + consumerKey +
     '&redirect_uri=' + window.location.origin+'/quickbooks'+
     '&scope=com.intuit.quickbooks.accounting' +
     '&response_type=code' +
     '&state=555ghjghj'
window.open(bb,'_self')
}
  ngOnInit() {

/*
if(this.getCookie("idToken"))
console.log("yup"  )
else
console.log("nope")*/


    this.form = this.formBuilder.group({
      bank: [null, Validators.required],
      routing: [null, Validators.required],
        cheque: [null, Validators.required],
          account: [null, Validators.required],
            address: [null, Validators.required],
            name: [null, Validators.required]

    });


    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
    console.log(data.json())
    var bankdata=data.json()
    console.log(bankdata.data.body.data.Items.length)
    if(bankdata.data.body.data.Items.length==0&&this.getCookie("idToken"))
      this.mdlSampleIsOpen=true
  else
  this.config=bankdata.data.body.data.Items[0]




    });





}



isFieldValid(field: string) {
  return !this.form.get(field).valid && this.form.get(field).touched;
}

displayFieldCss(field: string) {
  return {
    'has-error': this.isFieldValid(field),
    'has-feedback': this.isFieldValid(field)
  };
}







}
