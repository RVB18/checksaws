




import {Injectable,OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Issue} from '../models/issue';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { v4 as uuid } from 'uuid';



@Injectable()
export class DataService {





  private readonly API_URL = ' https://2xwiw9cxhb.execute-api.ap-south-1.amazonaws.com/pro/vendor';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
     datap:any;
  constructor (private httpClient: HttpClient) {}






  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(datas => {
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
  this.httpClient.post(this.API_URL, b).subscribe(data => {
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
    this.httpClient.put(this.API_URL+"?id="+issue.id, issue).subscribe(data => {
        this.dialogData = issue;

		  window.location.reload;

  });

}


  deleteIssue (id: number): void {

    this.httpClient.delete(this.API_URL+"?id="+id).subscribe(data => {
		  window.location.reload;


    console.log(id);
  })
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
}
