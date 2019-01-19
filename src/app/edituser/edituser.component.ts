







import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component,OnInit, Inject} from '@angular/core';
//mport {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})

export class EdituserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EdituserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    //this.dataService.updateIssue(this.data);
  }

  ngOnInit()
}
