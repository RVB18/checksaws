import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-flashh',
  templateUrl: './flashh.component.html',
  styleUrls: ['./flashh.component.css']
})
export class FlashhComponent implements OnInit {

  constructor(private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

     this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }

}
