import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-multicheck',
  templateUrl: './multicheck.component.html',
  styleUrls: ['./multicheck.component.css']
})
export class MulticheckComponent implements OnInit  {
  @ViewChild('clicktoopen') clicktoopen: ElementRef;

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
  constructor(private router:Router,private route: ActivatedRoute,private http:Http,private userdata:UserService,private _cookieService:CookieService,private snackBar: MatSnackBar) {
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
logout(){




this._cookieService.removeAll()
this.router.navigate(['/'])

}
 updatestatus(){
   console.log(this.data)
//	 var data=document.getElementById('to').value
   var data=(<HTMLInputElement>document.getElementById('to')).value;
if(data){
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
var should_updated=0;
var should_not_updated=0;
var typ=this.data
	  for(var t=0;t<typ.length;t++){
		  console.log(this.data[t])

if(this.data[t].Currentstatus=="NotSet"){
    podata.push({id:this.data[t].id,chequeid:parseInt(this.config.Chequenumber)+t})

    should_updated++;
}
else
should_not_updated++;
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


      var sett={"sign":this.config.sign,"State":this.config.State,"Zipcode":this.config.Zipcode, "Bankname": this.config.Bankname , "Address": this.config.Address, "Accountnumber":this.config.Accountnumber, "Routenumber":this.config.Routenumber, "Chequenumber": parseInt(this.config.Chequenumber+gh), "id": this.config.id, "Name":this.config.Name }
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
  else{

    this.snackBar.open("Please Select cheque Numbers","Ok",{
      duration:2000,
      panelClass:'red-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }


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
    //console.log("data "+this.message)

//if(this.config.length>0)
        this.userdata.currentMessage1.subscribe(message => this.config = message)
        this.config=JSON.parse(this.config)
this.config=this.config.data.body.data.Items[0]
console.log(this.config)

    this.data=JSON.parse(this.message)
    this.m=[{
      name:"hkk"
    }]

//window.print()
setTimeout(()=>{    //<<<---    using ()=> syntax
  window.print()

this.clicktoopen.nativeElement.click()
 }, 1500);




  }


    getCookie(key:string){
        return this._cookieService.get(key);
      }


}
