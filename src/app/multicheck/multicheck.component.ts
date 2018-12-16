import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-multicheck',
  templateUrl: './multicheck.component.html',
  styleUrls: ['./multicheck.component.css']
})
export class MulticheckComponent implements OnInit {

  data:any;
  m:any;
config:any;

  constructor(private route: ActivatedRoute,private http:HttpClient) {
this.config={}
   }

  ngOnInit() {
    this.m=[{
      name:"hkk"
    }]
    this.route.queryParams.subscribe(params => {
      var name = params['a']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
       //console.log(name);
       this.data=JSON.parse(name);
console.log(this.data)

//
			      this.http.get('https://6lwaus656f.execute-api.ap-south-1.amazonaws.com/pro/config').subscribe(data => {
              //console.log(data);

this.config=data
this.config=this.config.body.data.Items[0]
console.log(this.config)
          //    alert("Succesfully Saved")

            });

    });


  }

}
