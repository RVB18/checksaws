import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { v4 as uuid } from 'uuid';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
myHeaders:any;
options:any;
config:any;
loading:any;

  constructor(private formBuilder: FormBuilder,private _cookieService:CookieService,private http: Http,private snackBar: MatSnackBar) {
this.config={};
    this.myHeaders = new Headers();
    var k= this.getCookie("idToken");

      this.myHeaders.append('Authorization',k)
    console.log("headu",this.myHeaders)




      this.options = new RequestOptions({ headers: this.myHeaders });

      this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',this.options).subscribe(data => {
      console.log(data.json())
      var bankdata=data.json()

    this.config=bankdata.data.body.data.Items[0]




  });
  }

  getCookie(key:string){
      return this._cookieService.get(key);
    }

onreset(f){
  this.loading=true


  //alert(f.value)import { v4 as uuid } from 'uuid';

  console.log(f.value)
if(f.value.newpswd!=f.value.pswrepeat){
  this.snackBar.open("Password Didn't Matched","Ok",{
    duration:2000,
    panelClass:'red-snackbar',
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })


}
else{
  this.loading=true

var changedata=  {
    password:f.value.psw,
    newpassword:f.value.newpswd
}

        this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/resetpassword',changedata,this.options).subscribe(data => {
        var t=data.json()
        console.log(t)
        if(t.meassage=="success")
        {
          this.snackBar.open("Success","Ok",{
            duration:2000,
            panelClass:'green-snackbar',
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
        else{
          this.snackBar.open("Sorry caught an error","Ok",{
            duration:2000,
            panelClass:'red-snackbar',
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })


        }



    });
    this.loading=false
}


}


  onSubmit(f){
    var sett={}


    console.log(this.form);
    if (this.form.valid)


    if(Object.keys(this.config).length==0){



     console.log(sett +"dfg")

     sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": uuid(), "Name": f.value.name }


            //this.snackBar.open('Disco party!', 'Dism', {duration: 5000});

      //    this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-success', timeout: 1000});
                //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
                console.log('form submitted');




                  //this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 9991000});


}
    else{
sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": parseInt(f.value.cheque), "id": this.config.id, "Name": f.value.name }


//this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
 this.validateAllFormFields(this.form);




console.log(sett)
this.loading=true
    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
      console.log(data)
      this.loading=false

       //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});

      //alert("Succesfully Saved")

      var r=data.json();
      console.log(r)

//  this.success=r
           if(r.message=="Success"){
             this.snackBar.open("Success","Ok",{
               duration:2000,
               panelClass:'green-snackbar',
               horizontalPosition: 'center',
               verticalPosition: 'top'
             })

           }
             else{
               this.snackBar.open("Sorry caught an error","Ok",{
                 duration:2000,
                 panelClass:'red-snackbar',
                 horizontalPosition: 'center',
                 verticalPosition: 'top'
               })


}
  });

}
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
  ngOnInit() {
    this.form = this.formBuilder.group({
      bank: [null, Validators.required],
      routing: [null, Validators.required],
        cheque: [null, Validators.required],
          account: [null, Validators.required],
            address: [null, Validators.required],
            name: [null, Validators.required]

    });
  }

}
