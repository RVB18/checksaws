import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myHeaders:any;
  options:any
  data:any;
  constructor(private http: Http,private _cookieService:CookieService) {

    this.myHeaders = new Headers();
    var k= this.getCookie("idToken");
                    console.log(k)

                      this.myHeaders.append('Authorization',k)
                    console.log("headu",this.myHeaders)




                      this.options = new RequestOptions({ headers: this.myHeaders });

                              this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/dashboard',this.options).subscribe(data1 => {
                          console.log(data1.json())
                          this.data=data1.json()
})
  }

  ngOnInit() {
  }
  getCookie(key:string){
      return this._cookieService.get(key);
    }

}
