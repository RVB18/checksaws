import { Component,OnInit } from '@angular/core';
//import { UserService } from './services/user.service';
//import { User } from './models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { v4 as uuid } from 'uuid';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {



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

  constructor(private http: HttpClient) {
this.config={}

  }



  onSubmit(f){
console.log(f.value)

    this.http.post('http://alektasolutions.com/connected/config/save/ang',f.value).subscribe(data => {
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
var f={Name:data.value.Name,Date:ne,Dollar:data.value.Dollar,Address:data.value.Address}
console.log(f)
  this.http.post('http://13.232.165.2:3000/singlecheque',f).subscribe(data => {
    ///console.log(data);
    console.log(data)

    this.msg=data;
    if(this.msg.message=="Success"){
    alert("Succesfully Saved")
    window.location.reload();
}
    else
    alert("Spmething Went wrong..")

  //  window.open('/cheque')

  });
}
  ngOnInit() {

            this.http.get('http://13.232.165.2:3000/vendornames').subscribe(data => {
              //console.log(data);
            this.data=data
          var datas=this.data.data;
          //console.log(this.datas)
     var w=[]
    for(var a=0;a<datas.length;a++){
      if(datas[a].Name){
    w.push({Name:datas[a].Name})
    }

    }
    this.mat=w
    console.log(this.mat)

          //    alert("Succesfully Saved")
            //  window.open('/cheque')

            });


			      this.http.get('http://alektasolutions.com/connected/getconfig').subscribe(data => {
              console.log(data);

this.config=data
this.isDataAvailable = true

          //    alert("Succesfully Saved")
            //  window.open('/cheque')

            });


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
