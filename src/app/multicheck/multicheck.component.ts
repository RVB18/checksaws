import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-multicheck',
  templateUrl: './multicheck.component.html',
  styleUrls: ['./multicheck.component.css']
})
export class MulticheckComponent implements OnInit {

  message:any;
  m:any;
config:any;

  constructor(private route: ActivatedRoute,private http:HttpClient,private userdata: UserService) {
this.config={}
   }

  ngOnInit() {

    this.userdata.currentMessage.subscribe(message => this.message = message)
    console.log("data "+this.message)


        this.userdata.currentMessage1.subscribe(message => this.config = message)
console.log(this.config)
      this.config=this.config.data.body.data.Items[0]
    this.message=JSON.parse(this.message)
    this.m=[{
      name:"hkk"
    }]
  /*  this.route.queryParams.subscribe(params => {
      var name = params['a']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
       //console.log(name);

//*/
			     this.http.get('https://6lwaus656f.execute-api.ap-south-1.amazonaws.com/pro/config').subscribe(data => {
              //console.log(data);


          //    alert("Succesfully Saved")
window.print()






});

}


  }
