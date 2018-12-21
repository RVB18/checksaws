import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private messageSource1 = new BehaviorSubject('default message');
  currentMessage1 = this.messageSource1.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  changeMessage1(message: string) {
    this.messageSource1.next(message)
  }

}
