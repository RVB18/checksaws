



import {Injectable,OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { v4 as uuid } from 'uuid';

import { CookieService } from 'angular2-cookie/core';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

@Injectable()
export class DataService {






  private readonly API_URL = 'https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor';



  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
     datap:any;

  dataSource: MatTableDataSource<VendorData>;
  datap:any;
  coun:any;


  constructor (private http: Http,private _cookieService:CookieService,private router: Router) {

    this.coun=0;
        // Assign the data to the data source for the table to render
    //


    const users: VendorData[] = [];

    var k= this.getCookie("idToken");
                    console.log(k+"venkat")


    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization',k)
  console.log(myHeaders)
    let optionss = new RequestOptions({ headers: myHeaders });

    this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/vendor',optionss).subscribe(data => {
    console.log(data.json())


    console.log("j")
    this.datap=data.json()


    this.datap=this.datap.body.data.Items;
    console.log(this.datap)
      for(var t=0;t<this.datap.length;t++){


        users.push(this.datap[t])

      }
    console.log(users)

      this.dataSource = new MatTableDataSource(users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //  console.log("sdfsd "+this.dataSource)


    });






  }





          getCookie(key:string){
              return this._cookieService.get(key);
            }


  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {




    this.http.get<Issue[]>(this.API_URL).subscribe(datas => {
      this.datap=datas;
        this.dataChange.next(this.datap.body.data.Items);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }









//
  // DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): void {


    console.log( uuid());
var b={id:uuid(),Name:issue.Name,Address:issue.Address,Mobile:issue.Mobile,Email:issue.Email}

console.log(b)

    console.log(issue)


  this.http.post(this.API_URL, b).subscribe(data => {
          this.dialogData = issue;
		  window.location.reload;


      //this.dialogData = kanbanItem;
    //  this.toastrService.success('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      //this.toastrService.error('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
  }

  updateIssue (issue: Issue): void {
console.log(issue);
    this.http.put(this.API_URL+"?id="+issue.id, issue).subscribe(data => {
        this.dialogData = issue;

		  window.location.reload;

  });

}


  deleteIssue (id: number): void {

    this.http.delete(this.API_URL+"?id="+id).subscribe(data => {
		  window.location.reload;


    console.log(id);
  })
}




  }


//REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
  /*  addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
/*
    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/

export interface VendorData {
  id: string;
  Name: string;
  Address: string;
  Email: string;
  Mobile:string;

}
