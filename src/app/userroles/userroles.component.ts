import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  FormControl
} from '@angular/forms';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-userroles',
  templateUrl: './userroles.component.html',
  styleUrls: ['./userroles.component.css']
})
export class UserrolesComponent implements OnInit {
  closeResult: string;
  loading:boolean=false;
  isLoading:boolean=false;
  options:any;
  data:any;
  getCookie(key:string){
      return this._cookieService.get(key);
    }

  constructor(private http:Http,private modalService: NgbModal,private _cookieService:CookieService) {

    var k= this.getCookie("idToken");

          let myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          myHeaders.append('Authorization',k)
          this.options = new RequestOptions({ headers: myHeaders });


  }

ngOnInit(){


}
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      var em = (<HTMLInputElement>document.getElementById('email'));
      var pass = (<HTMLInputElement>document.getElementById('password'));


console.log(em.value)/*
      this.loading=true
          this.http.post('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/admincreateuser',{Name:name},this.options).subscribe(data => {
            console.log(data.json());
            this.data=data.json();


      this.loading=false

            if(this.data.message=="Unauthorized")
                                  {
                                    alert("forbidden")
                                    window.location.href="/login"
                                  }
                                  else if(this.data.message=="The incoming token has expired"){
                                    alert("Sorry Session Expired")
                                    window.location.href="/login"

                                  }

          else{




          }
              });



*/

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
