import { Component, OnInit,Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-usersservice',
  templateUrl: './usersservice.component.html',
  styleUrls: ['./usersservice.component.css']
})


@Injectable()
export class UsersserviceComponent implements OnInit {

  private messageSource = [];
  currentMessage = this.messageSource

  constructor() { }



//

  ngOnInit() {






  }

}
