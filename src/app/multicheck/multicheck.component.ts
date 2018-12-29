import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-multicheck',
  templateUrl: './multicheck.component.html',
  styleUrls: ['./multicheck.component.css']
})
export class MulticheckComponent implements OnInit  {

  data:any;
  m:any;
 printdata:any;
 config:any
 coun:any;
 message:any;
  mdlSampleIsOpen : boolean = false;
to:any;
  constructor(private router:Router,private route: ActivatedRoute,private http:HttpClient,private userdata:UserService) {
	 this.config={}
	 this.coun=0
	 this.to=""
  }

  private openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
	this.router.navigate(['/cheques']);

}
 updatestatus(){
	 var data=document.getElementById('to').value
var idmap='';


	  console.log(data +"sdfgs "+ this.config.cheque)
	  var gh=0;
	  //{from: "236", to: "249"}
	  if(data==this.config.cheque){
		  gh=0
	  }
	  else{
	  gh=parseInt(data)-parseInt(this.config.cheque)
	  }
	  console.log(this.config.cheque+"  checking "+gh)
	//  var po=parseInt(data.value.to)-parseInt(data.value.from)

	  for(var t=0;t<=gh;t++){
		  console.log(this.data[t].id)




		  	idmap+="'"+this.data[t].id+"',"

	  }
	  idmap = idmap.slice(0, -1); // "12345.0"


console.log(idmap)
if(gh==0)
	gh=1
else
	gh++
  /*this.http.get('http://13.232.165.2:3000/statusupdates?a='+idmap).subscribe(data => {
      console.log(data);
      this.data=data.data;

this.http.get('http://52.11.32.193/connected/chequeupdate?a='+gh).subscribe(data => {
      console.log(data);
      //this.data=data.data;

//this.router.navigate(['/cheques']);
window.location.replace("/cheques");


    });
  });*/
  }

  pagin(f){
	 // console.log(typeof this.coun)
	  if(this.coun==2)
		  this.coun=0
	  else
		  this.coun++

	  console.log(this.coun)
	  return this.coun;
  }

  ngOnInit() {


    this.userdata.currentMessage.subscribe(message => this.message = message)
    console.log("data "+this.message)


        this.userdata.currentMessage1.subscribe(message => this.config = message)
this.config=this.config.data.body.data.Items[0]
console.log(this.config)

    this.data=JSON.parse(this.message)
    this.m=[{
      name:"hkk"
    }]

//window.print()
setTimeout(()=>{    //<<<---    using ()=> syntax
  window.print()

  this.mdlSampleIsOpen = true;
 }, 1500);




  }



}
