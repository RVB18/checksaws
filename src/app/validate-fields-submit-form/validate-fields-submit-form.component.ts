





import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-validate-fields-submit-form',
  templateUrl: './validate-fields-submit-form.component.html',
  styles: ['./validate-fields-submit-form.component.css']
})
export class ValidateFieldsSubmitFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar,private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        street2: [null],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required]
      })
    });
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid)

    {

          //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
  this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-success', timeout: 1000});
      //this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
      console.log('form submitted');


    } else {


     this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {

        //this._flashMessagesService.show('Please Enter Valid Credentials', {cssClass: 'alert-danger', timeout: 1000});
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset(){
    this.form.reset();
  }
}
