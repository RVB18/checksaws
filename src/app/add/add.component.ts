import { OnInit } from '@angular/core';



import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {DataService} from '../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../models/issue';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})



export class AddComponent  implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Issue,
              public dataService: DataService) { }




  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {


    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :


        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {


    this.dialogRef.close();
  }

  public confirmAdd(): void {



    this.dataService.addIssue(this.data);
  }




                  ngOnInit() {







}
}
