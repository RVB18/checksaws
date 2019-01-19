import { Component, OnInit } from '@angular/core';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }


  openDiscoPartySnackBar() {
    this.snackBar.open('Disco party!', 'Dismiss', {duration: 5000});
  }

  openNotificationSnackBar() {
    this.snackBar.open('Thank you for your support!', '', {duration: 2000});
  }

  ngOnInit() {
  }

}
