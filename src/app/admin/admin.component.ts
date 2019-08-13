import { Component,OnInit,Inject ,ElementRef } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserService } from '../services/user.service';


import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie';

import { v4 as uuid } from 'uuid';

import {MatSnackBar} from '@angular/material';

import { FlashMessagesService } from 'angular2-flash-messages';
import {  ViewEncapsulation,  ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';


import {  MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  @ViewChild('dockBar')
  @ViewChild('closesinglecheck') singling: ElementRef;
  @ViewChild('closebank') closebank: ElementRef;

editdata:any;
      public dockBar: SidebarComponent;
      public enableDock: boolean = true;
      public width: string = '220px';
      public dockSize: string = '72px';
      // only for sample browser use


      // open new tab
      newTabClick(): void {
          document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'sidebar/docking-sidebar/index.html');
      }
      positionChange(args: any) {
          this.dockBar.position = args.value == "left" ? "Left" : "Right";
      }
      toggleClick() {
          this.dockBar.toggle();
      }


        configSuccess: MatSnackBarConfig = {
          //panelClass: 'style-success',
          duration: 2000,
          panelClass:['red-snackbar'],
          horizontalPosition: 'center',
          verticalPosition: 'top'
        };




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
success:any;
isDataAvailable:boolean = false;
loading:boolean = false;

myHeaders:any;
options:any;
showNav:boolean=false;
mdlSampleIsOpen : boolean = false;
base64textString:any;
Addresscomplete:any;
getCookie(key:string){
    return this._cookieService.get(key);
  }

  constructor(private userdata:UserService,private http: Http,private router: Router,private formBuilder: FormBuilder,private _cookieService:CookieService,private snackBar: MatSnackBar,private _flashMessagesService: FlashMessagesService) {
this.config={}
this.editdata={}
this.myHeaders = new Headers();
var k= this.getCookie("idToken");
                console.log(k)
this.hash={}
                if(window.location.pathname=="/"||window.location.pathname=="/signup"||window.location.pathname=="/"||window.location.pathname=="")
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






  oncreate(f){
    this.loading=true;
  var drivecreate={

    "email": f.email,
    "password":f.password,
    "firstname": f.firstname,
    "lastname": f.lastname,
    "phonenumber":"+91"+f.phonenumber,
    "driverid": uuid()
  }


  console.log(drivecreate)
  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',drivecreate,this.options).subscribe(data => {
  //window.location.reload()
  console.log(data)
  var r=data.json();
  console.log(r);
this.loading=false

  this.success=r




 if(this.success.message=="Failure"){

   this.snackBar.open("Unable To Create","Ok",{
     duration:2000,
     panelClass:'red-snackbar',
     horizontalPosition: 'center',
     verticalPosition: 'top'
   })}
   else{
     this.snackBar.open("User Created","Ok",{
       duration:2000,
       panelClass:'green-snackbar',
       horizontalPosition: 'center',
       verticalPosition: 'top'
     })
location.reload();
   }
  })

  }



testprint(){
var a=[{"count":1,"street":"PO BOX 96-0479","postal":"Oklahoma City OK  73196-0479","id":"7b2c6835-bf21-469e-96ee-f0b75cd9addd","name":"Love's Solutions, LLC","date":"10/31/2018","amount":"*2090.00","words":"Two Thousand Ninety  and 00 cents","load":8234,"carrer":"M A LOPEZ LOGISTIC LLC"},{"count":2,"street":"PO BOX 151052","postal":"Ogden UT 84415","id":"095112af-309b-4c65-882f-23a362662f95","name":"Financial Carrier Services, INC","date":"10/30/2018","amount":"**700.00","words":"Seven Hundred  and 00 cents","load":8233,"carrer":"MERIDA LOGISTICS LLC"},{"count":3,"street":"1110-240 SKYVIEW RANCH ROAD NE","postal":"CALGARY AB T3N 0P4","id":"91d2db96-04ac-48ed-9292-a16b07d653f9","name":"TOP WAY LOGISTICS INC","date":"10/29/2018","amount":"*1470.00","words":"One Thousand Four Hundred Seventy  and 00 cents","load":8231,"carrer":"TOP WAY LOGISTICS INC"}]
  this.userdata.changeMessage(JSON.stringify(a))
  var tconfig={statusCode:200,"data":
  {message:"success",body:
  {data:{Items:
  [{Bankname:"Bank Of America N",Address:"11233 W Elm Ln. Avondale",Client:"fedricks199@gmail.com",Accountnumber:"457034047941",timestamp:"Fri, 09 Aug 2019 06:05:34 GMT",Routenumber:"122101706",Zipcode:"85323",Chequenumber:6859,id:"480c1584-6524-44fe-a431-1035bf18296d",State:"AZ",sign:"https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Gary_Vaynerchuk_Signature.svg/1280px-Gary_Vaynerchuk_Signature.svg.png"
}]}}}}
  this.userdata.changeMessage1(JSON.stringify(tconfig))
  this.router.navigate(['/multicheck']);


}





  handleFileSelect(evt){
        var files = evt.target.files;
        var file = files[0];

      if (files && file) {
          var reader = new FileReader();

          reader.onload =this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
      }
    }

    _handleReaderLoaded(readerEvt) {
       var binaryString = readerEvt.target.result;
              this.base64textString= btoa(binaryString);
              console.log(btoa(binaryString));
      }



  onSubmit(f){
    var sett={}
    this.validateAllFormFields(this.form);

    console.log(f.value);
    if (this.form.valid)


    if(Object.keys(this.config).length==0){



     console.log(sett +"dfg")

     sett={sign:this.base64textString, "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": uuid(), "Name": f.value.name }


            //this.snackBar.open('Disco party!', 'Dism', {duration: 5000});

                //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
                console.log('form submitted');




                  //this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 9991000});


}
    else{
sett={sign:this.base64textString, "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": this.config.id, "Name": f.value.name }

}
//this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});


 this.loading=true



console.log(sett)
    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
      console.log(data)
      this.loading=false

       //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});

      //alert("Succesfully Saved")

      var r=data.json();

                 if(r.message=="Success"){
                   this.snackBar.open("Success","Ok",{
                     duration:2000,
                     panelClass:'green-snackbar',
                     horizontalPosition: 'center',
                     verticalPosition: 'top'
                   })
this.closebank.nativeElement.click();
                 }
                   else{
                     this.snackBar.open("Sorry caught an error","Ok",{
                       duration:2000,
                       panelClass:'red-snackbar',
                       horizontalPosition: 'center',
                       verticalPosition: 'top'
                     })


      }
//  this.success=r
           /*if(this.success=="success")
             this.snackBar.open('Disco party!', 'error', {duration: 5000});
             else
             this.snackBar.open('Disco party!', 'error', {duration: 5000});*/


  });


}



validateAllFormFields(formGroup: FormGroup) {


  /*this.snackBar.open("Success","Ok",{
    duration:2000,
    panelClass:'green-snackbar',
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })*/

  /*-this.snackBar.openFromComponent(PizzaPartyaComponent, {
    sasa: 'ggg',
    ...this.configSuccess
  });*/

     //this.snackBar.open('Disco partyyyty!', 'Success', {duration: 5000});

      //this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
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

  this.singling.nativeElement.click();

  this.snackBar.open("Success","Ok",{
    duration:2000,
    panelClass:'green-snackbar',
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })

location.reload()
}



else {
//console.log(this.success.message);



   this.snackBar.open("Success","Ok",{
     duration:2000,
     panelClass:'green-snackbar',
     horizontalPosition: 'center',
     verticalPosition: 'top'
   })

this._flashMessagesService.show('Please Enter Valid Credentiwarningals', {cssClass: 'alert-warning', timeout: 1000});

//this.snackBar.open('Please Enter Valid Credentials', 'error', {duration: 5000});
//alert("There is a problem in creating a check")
}
});

}




logout(){




this._cookieService.removeAll()
this.router.navigate(['/'])

}
redirect(){

  this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/quickbooks-checks',this.options).subscribe(data => {
console.log(data.json())
  })

  /*
var port=4200
var consumerKey='Q0ypusZrhhgqsIbvnA1PNv2rleMwENKSvuY5GGbDS3kfskJ1Ho'
console.log(window.location)
var bb=  "https://appcenter.intuit.com/connect/oauth2" +
     '?client_id=' + consumerKey +
     '&redirect_uri=' + window.location.origin+'/admin/quickbooks'+
     '&scope=com.intuit.quickbooks.accounting' +
     '&response_type=code' +
     '&state=555ghjghj'
window.open(bb,'_self')*/
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
            name: [null, Validators.required],
            file: [null, Validators.required]


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


/*
@Component({
  selector: 'app-snack',
  templateUrl: 'app-snack.html',
})
export class PizzaPartyaComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public sasa: any) { }


}*/
