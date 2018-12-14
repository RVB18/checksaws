


import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component,OnInit, Inject} from '@angular/core';
import {DataService} from '../services/data.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-mattableedit',
  templateUrl: './mattableedit.component.html',
  styleUrls: ['./mattableedit.component.css']
})
export class MattableeditComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<MattableeditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

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

  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }



    ngOnInit() {



    }
}
