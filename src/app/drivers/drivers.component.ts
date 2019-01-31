






import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuid } from 'uuid';

import { FormsModule }   from '@angular/forms';



@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  editdata:any;


  //@ViewChild('closeBtn') closeBtn: ElementRef;



  constructor(private modalService: NgbModal,private http: Http) {
    this.editdata={}
  }

  displayedColumns: string[] = ['Name', 'BUS', 'Mobile', 'Address','actions'];
    dataSource :MatTableDataSource<Drivers>;
driver:any;
datap:any;
driversdata: Drivers[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;


    open(data) {
this.editdata=data
console.log(this.editdata)

      }

      add(){

      }
onSubmit(f){
  console.log(f)
//  this.closeBtn.nativeElement.click();

}
oncreate(f){
var drivecreate={
  "feature": "driver_crud",
  "operation": "driver_create",
  "name": f.name,
  "mobile": f.mobile,
  "busnumber": f.bus,
  "clgname": "vignan",
  "address": f.address,
  "clgcode": "vgnt",
  "driverid": uuid()
}

console.log(drivecreate)
this.http.post('https://kb78mnh1ik.execute-api.ap-south-1.amazonaws.com/prod/driver-web',drivecreate).subscribe(data => {
//window.location.reload()
console.log(data)
})

}
onedit(f,data1){

  var driveredit={
    "feature": "driver_crud",
    "operation": "driver_update",
    "name": f.name,
    "mobile": f.mobile,
    "busnumber": f.bus,
    "clgname": "vignan",
    "address": f.address,
    "clgcode": "vgnt",
    "driverid": data1.driverid
  }
console.log(driveredit)
  this.http.put('https://kb78mnh1ik.execute-api.ap-south-1.amazonaws.com/prod/driver-web',driveredit).subscribe(data => {
  //window.location.reload()
  console.log(data)
  })


}
delete(){

  var del={
    "feature": "driver_crud",
    "operation": "driver_delete",
    "clgcode": "vgnt",
    "driverid": this.editdata.driverid
  }
console.log(del)
  this.http.delete('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser?username=b96e99ec-4646-4b70-8f43-d73d160156db').subscribe(data => {
  //window.location.reload()
  console.log(data)
  })


}
    ngOnInit() {
      this.http.get('https://kb78mnh1ik.execute-api.ap-south-1.amazonaws.com/prod/driver-web?feature=driver_crud&operation=driver_read&clgcode=vgnt').subscribe(data => {

        this.datap=data.json();
                           console.log(this.datap)
                             for(var t=0;t<this.datap.length;t++){


                               this.driversdata.push(this.datap[t])

                             }
                             this.dataSource = new MatTableDataSource(this.driversdata);

                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.sort = this.sort;
//
      });
    // this.dataSource.paginator = this.paginator;
    }
  }

  export interface Drivers {
    Name: string;
    busnumber: number;
    Mobile: number;
    Address: string;
  }
