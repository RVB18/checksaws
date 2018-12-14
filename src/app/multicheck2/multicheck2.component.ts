
import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-multicheck2',
  templateUrl: './multicheck2.component.html',
  styleUrls: ['./multicheck2.component.css']
})
export class Multicheck2Component implements OnInit {

  data:any;
  map:any;

  displayedColumns = [ 'chequeid', 'Name', 'Date', 'Amount','Status'];
  dataSource: MatTableDataSource<UserData>;
//
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient) {
    // Create 100 users
    const users: UserData[] = [];
    //  for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    this.map = new Map();

    // Assign the data to the data source for the table to render


    this.http.get('http://13.232.165.2:3000/cheque').subscribe(data => {
      //console.log(data);
      this.data=data;
      for(var t=0;t<this.data.length;t++){
        users.push(data[t])

      }
      this.dataSource = new MatTableDataSource(users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    //  console.log("sdfsd "+this.dataSource)


    });
  }

  /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnInit(){}

}



export interface UserData {
  chequeid: string;
  Name: string;
  Date: string;
  Dollar: string;
}
