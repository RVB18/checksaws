
import { Component } from '@angular/core';
//import { UserService } from '../services/user.service';



import {DataSource} from '@angular/cdk/collections';

import { ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Issue} from '../models/issue';
import {AddComponent} from '../add/add.component';
import { MattableeditComponent } from '../mattableedit/mattableedit.component';
import { MattabledeleteComponent } from '../mattabledelete/mattabledelete.component';
import {map} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../services/user.service';



import { Angular5Csv } from 'angular5-csv/Angular5-csv';


import { ActivatedRoute } from '@angular/router';


import { Http,RequestOptions  } from '@angular/http';

import {  Headers, Response } from '@angular/http';

 import * as XLSX from 'xlsx';

import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})

export class TableviewComponent implements OnInit {
  displayedColumns = ['id', 'Name', 'Address', 'Mobile', 'Email','actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    @ViewChild('TABLE') table: ElementRef;

ExportTOExcel()
{
	//console.log(this.table.nativeElement)
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
   console.log(ws)
  /* var head=[];
       var range = XLSX.utils.decode_range(ws['!ref']);
	   for(var R = range.s.r; R <= range.e.r; ++R) {
  for(var C = range.s.c; C <= range.e.c-1; ++C) {
    var cell_address = {c:C, r:R};
     if an A1-style address is needed, encode the address
    var cell_ref = XLSX.utils.encode_cell(cell_address);
	console.log(ws[cell_ref])
	head.push(ws[cell_ref])
  }
}*/

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //console.log(ws["A"])

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');

}



  ngOnInit() {




    this.loadData();



  }

  refresh() {
    this.loadData();
  }

  addNew(issue: Issue) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: { }

    });



    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: string, Name: string, Address: string, Mobile: string, Email:string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(MattableeditComponent, {
      data: {id: id, Name: Name, Address: Address, Mobile: Mobile, Email: Email}
    });

//			window.location.reload;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);//
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[this.index] = this.dataService.getDialogData();
		console.log(this.dataService.getDialogData())
        // And lastly refresh table
        this.refreshTable();
		//window.location.reload
      }
    });
  }

  deleteItem(i: number, id: string, Name: string, Address: string, Mobile: string, Email:string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(MattabledeleteComponent, {
      data: {id: id, Name: Name, Address: Address, Mobile: Mobile,Email:Email}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

on(){




}
  private refreshTable() {
    //Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }


    // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    /*if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
*/


  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
	//new Angular2Csv(this.exampleDatabase, 'My Report');

    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
          const searchStr = (issue.id + issue.Name + issue.Address + issue.Mobile+issue.Email).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      /*switch (this._sort.active) {
        case 'vendorid': [propertyA, propertyB] = [a.vendorid, b.vendorid]; break;
        case 'Name': [propertyA, propertyB] = [a.Name, b.Name]; break;
        case 'Address': [propertyA, propertyB] = [a.Address, b.Address]; break;
        case 'url': [propertyA, propertyB] = [a.url, b.url]; break;

      }*/

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}

//

export function getdata(sheet){
   var result = [];
   var row;
   var rowNum;
   var colNum;
   var range = XLSX.utils.decode_range(sheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = sheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell.w);
       }
       result.push(row);
   }
   return result;
};
