import { Component,OnInit } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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

s=[];

msg:any;
  mat:any;

  data:any;

config:any;
isDataAvailable:boolean = false;

  constructor(private http: HttpClient,private formBuilder: FormBuilder) {
this.config={}

  }
//


  onSubmit(f){
//console.log(f.value)
var sett={ "Bankname": f.value.bank , "Address": f.value.address, "Accountnumber":f.value.account, "Routenumber":f.value.routing, "Chequenumber": f.value.cheque, "id": "", "Name": f.value.name }
console.log(sett)

    this.http.post('https://6lwaus656f.execute-api.ap-south-1.amazonaws.com/pro/config',sett).subscribe(data => {
      //console.log(data);
      console.log(data)
      alert("Succesfully Saved")
    //  window.open('/cheque')

  });
}
onvendorcreate(data){

  console.log(data.value)
var date=new Date(data.value.Date)
var t=date.getMonth()+1
var ne=t+"/"+date.getDate()+"/"+date.getFullYear();

var f={Name:data.value.Name,Date:ne,Amount:data.value.Amount,Carrername:data.value.Careern,Loadnumber:data.value.Loadnumber,id:uuid()}
console.log(f)

 this.http.put('https://coet3arhmf.execute-api.ap-south-1.amazonaws.com/pro/cheques',f).subscribe(data => {
    ///console.log(data);
    console.log(data)

    this.msg=data;
    if(this.msg.message=="Success"){
    alert("Succesfully Saved")
  //  window.location.reload();
}
    else
    alert("Spmething Went wrong..")

  //  window.open('/cheque')

});
}
  ngOnInit() {



            this.http.get('https://2xwiw9cxhb.execute-api.ap-south-1.amazonaws.com/pro/vendor').subscribe(data => {
              //console.log(data);
            this.data=data


          var datas=this.data.body.data.Items;
          //console.log(this.datas)






    this.mat=datas
    console.log(this.mat)

          //    alert("Succesfully Saved")
            //  window.open('/cheque')

            });










			      this.http.get('https://6lwaus656f.execute-api.ap-south-1.amazonaws.com/pro/config').subscribe(data => {
              console.log(data);

              this.config=data
              this.config=this.config.data.body.data.Items[0]

              console.log(this.config)
this.isDataAvailable = true

          //    alert("Succesfully Saved")
            //  window.open('/cheque')

            });



            this.form = this.formBuilder.group({

              bank: [null, Validators.required],
                routing: [null, Validators.required],
                cheque:[null, Validators.required],
                account:[null, Validators.required],
                name:[null, Validators.required],
                address:[null, Validators.required],
                Description:[null, Validators.required],
                Amount:[null, Validators.required],
                Loadnumber:[null, Validators.required],
                Careern:[null, Validators.required],
                Date:[null, Validators.required],
                Name:[null, Validators.required]
            })


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

  onSubmit1() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
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
  }







  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/
