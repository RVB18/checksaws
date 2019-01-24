import { Component,Inject,OnInit } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig, MAT_SNACK_BAR_DATA } from '@angular/material';


@Component({
  selector: 'app-snack-bar-component-example',
  templateUrl: './snack-bar-component-example.component.html',
  styleUrls: ['./snack-bar-component-example.component.css']
})
export class SnackBarComponentExampleComponent implements OnInit {

  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 1000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.openFromComponent(PizzaPartyComponent, {
      data: 'Sample data',
      ...this.configSuccess
    });
  }





  //constructor() { }

  ngOnInit() {
  }

}




@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
})
export class PizzaPartyComponent {
  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
