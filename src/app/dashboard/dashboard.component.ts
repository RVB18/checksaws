import { Component, OnInit,ViewChild } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myHeaders:any;
  options:any
  data:any;
  range:Range = {fromDate:new Date(), toDate: new Date()};
  options1:NgxDrpOptions;
  presets:Array<PresetItem> = [];
  @ViewChild('dateRangePicker') dateRangePicker;

  constructor(private http: Http,private _cookieService:CookieService) {

    this.myHeaders = new Headers();
    var k= this.getCookie("idToken");
                    console.log(k)

                      this.myHeaders.append('Authorization',k)
                    console.log("headu",this.myHeaders)




                      this.options = new RequestOptions({ headers: this.myHeaders });

                              this.http.get('https://y50p3nohl9.execute-api.us-west-2.amazonaws.com/prod/dashboard',this.options).subscribe(data1 => {
                          console.log(data1.json())
                          this.data=data1.json()
})
  }

  ngOnInit() {
    const today = new Date();
const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);

this.setupPresets();
this.options1 = {
                presets: this.presets,
                format: 'mediumDate',
                range: {fromDate:today, toDate: today},
                applyLabel: "Submit",
                calendarOverlayConfig: {
                  shouldCloseOnBackdropClick: false,
                //  hasBackDrop: false,
                }
                // cancelLabel: "Cancel",
                // excludeWeekends:true,
                // fromMinMax: {fromDate:fromMin, toDate:fromMax},
                // toMinMax: {fromDate:toMin, toDate:toMax}
              };
}
  // handler function that receives the updated date range object
  updateRange(range: Range){
    this.range = range;
  }

  // helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets =  [
      {presetLabel: "Yesterday", range:{ fromDate:yesterday, toDate:today }},
      {presetLabel: "Last 7 Days", range:{ fromDate: minus7, toDate:today }},
      {presetLabel: "Last 30 Days", range:{ fromDate: minus30, toDate:today }},
      {presetLabel: "This Month", range:{ fromDate: currMonthStart, toDate:currMonthEnd }},
      {presetLabel: "Last Month", range:{ fromDate: lastMonthStart, toDate:lastMonthEnd }}
    ]
  }
  getCookie(key:string){
      return this._cookieService.get(key);
    }

}
export interface PresetItem {
    presetLabel: string;
    range: Range;
}

export interface Range {
    fromDate: Date;
    toDate: Date;
}

export interface CalendarOverlayConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    shouldCloseOnBackdropClick?: boolean;
}

export interface NgxDrpOptions {
    presets: Array<PresetItem>;
    format: string;
    range: Range;
    excludeWeekends?: boolean;
    locale?: string;
    fromMinMax?: Range;
    toMinMax?: Range;
    applyLabel?: string;
    cancelLabel?: string;
    animation?: boolean;
    calendarOverlayConfig?: CalendarOverlayConfig;
    placeholder?: string;
    startDatePrefix?: string;
    endDatePrefix?: string;
}
