
import { Component, OnInit ,ViewChild} from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-multicheck2',
  templateUrl: './multicheck2.component.html',
  styleUrls: ['./multicheck2.component.css']
})
export class Multicheck2Component implements OnInit {
myHeaders:any;
options:any;
access:any;
  getCookie(key:string){
      return this._cookieService.get(key);
    }

  constructor(private http:Http,private router:Router,private activatedRoute: ActivatedRoute,private _cookieService:CookieService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      //  console.log(params.code);

    this.myHeaders = new Headers();
    this.myHeaders.append('Authorization',this.getCookie("idToken"))


    this.options = new RequestOptions({ headers: this.myHeaders });
var data={code:params.code,url:window.location.origin+window.location.pathname}
console.log(data)

    this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/quickbooks',data,this.options).subscribe(data => {


this.access=data.json()
console.log(this.access)
this._cookieService.put("quickbookstoken",this.access.access_token);

this.router.navigate(['/cheques',{ queryParams: { "host": 'qb' } }])
    });
      });
  }




  ngOnInit(){}

}
