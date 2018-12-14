import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-mattabledelete',
  templateUrl: './mattabledelete.component.html',
  styleUrls: ['./mattabledelete.component.css']
})
export class MattabledeleteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<MattabledeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }


                onNoClick(): void {
                  this.dialogRef.close();
                }

                confirmDelete(): void {
                  this.dataService.deleteIssue(this.data.id);
                }

  ngOnInit() {
  }

}
