import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie';

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
public loading = false;

options:any;
  constructor(private router:Router,private route: ActivatedRoute,private http:Http,private userdata:UserService,private _cookieService:CookieService) {
	 this.config={}
	 this.coun=0
	 this.to=""
   var k= this.getCookie("idToken");
                   console.log(k+"venkat")




   	let myHeaders = new Headers();
   	myHeaders.append('Content-Type', 'application/json');
     myHeaders.append('Authorization',k)
   console.log(myHeaders)
     let options = new RequestOptions({ headers: myHeaders });

   this.options=options;

  }

  public openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
	this.router.navigate(['/admin/cheques']);

}
 updatestatus(){
//	 var data=document.getElementById('to').value
   var data=(<HTMLInputElement>document.getElementById('to')).value;
var idmap='';
var podata=[];

	  console.log(data +"sdfgs "+ this.config.Chequenumber)
	  var gh=0;
	  //{from: "236", to: "249"}
	  if(data==this.config.Chequenumber){
		  gh=0
	  }
	  else{

	  gh=parseInt(data)-parseInt(this.config.Chequenumber)
    console.log(this.config.Chequenumber+"  checking " +" "+gh)

	  }
	//  var po=parseInt(data.value.to)-parseInt(data.value.from)

	  for(var t=0;t<=gh;t++){
		  console.log(this.data[t].id)


        podata.push(this.data[t].id)

		  	//idmap+="'"+this.data[t].id+"',"

	  }
	 // idmap = idmap.slice(0, -1); // "12345.0"


//console.log(idmap)
if(gh==0)
	gh=1
else
	gh++

  var printchangedata={id:podata}
  console.log(printchangedata)
  this.loading=true

  this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/changecheckstatus',printchangedata,this.options).subscribe(data => {
      console.log(data.json());


      var sett={ "Bankname": this.config.Bankname , "Address": this.config.Address, "Accountnumber":this.config.Accountnumber, "Routenumber":this.config.Routenumber, "Chequenumber": parseInt(this.config.Chequenumber+gh), "id": this.config.id, "Name":this.config.Name }
      console.log(sett)

          this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/config',sett,this.options).subscribe(data => {
            //console.log(data);
            console.log(data)
            this.loading=false

            //alert("Succesfully Saved")
            //window.open("/cheques","_self")
           this.router.navigate(['/admin/cheques'])

        });

  });
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


    getCookie(key:string){
        return this._cookieService.get(key);
      }


}
