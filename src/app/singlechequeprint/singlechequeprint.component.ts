import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-singlechequeprint',
  templateUrl: './singlechequeprint.component.html',
  styleUrls: ['./singlechequeprint.component.css']
})
export class SinglechequeprintComponent implements OnInit, AfterViewInit {

  data:any;

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) { }
  ngAfterViewInit() {
console.log(this.data)
var a=this.data
// this.router.navigate(['/vendorcheckdetails',a.Name]);

    }
  ngOnInit() {
    this.route.params.subscribe(params => {
       this.data = JSON.parse(params['data']); // (+) converts string 'id' to a number
console.log(this.data)
       // In a real app: dispatch action to load the details here.

       var num=this.data.Dollar+"";
       if(num.includes(".")){
       var dot=num .split(".")
       var doting=""
       if(dot[1].length==1)
       doting=dot[1]+"0"
       else
       doting=dot[1]
       var nu=(convertNumberToWords(dot[0])+" and "+doting+"/100*****").toString()
       var astreik="";
       var g1=5-dot[0].length

       while(g1>0){

       astreik+="*"


       g1--;
       }
       window.open('http://alektasolutions.com/purchase/print/cheque/ang?date='+this.data.Date+'&name='+this.data.Name+'&amount='+astreik+this.data.Dollar+'&addr=,,')

       }
       else{

         var g1=5-num.length
         console.log("astreik "+g1)

         var astreik=""
         while(g1>0){

         astreik+="*"


         g1--;
         }
         console.log("astreik "+g1)
         window.open('http://alektasolutions.com/purchase/print/cheque/ang?date='+this.data.Date+'&name='+this.data.Name+'&amount='+astreik+this.data.Dollar+'&addr=,,')
       }
    });
    var a=this.data
    this.http.get('http://13.232.165.2:3000/statusupdate?chequeid='+a.chequeid).subscribe(data => {
          //console.log(data);
        //  this.data=data;
          console.log(data);

        });
        window.print()

  }

}



export function  convertNumberToWords(amount:string) {


   var words = new Array();
   words[0] = '';
   words[1] = 'One';
   words[2] = 'Two';
   words[3] = 'Three';
   words[4] = 'Four';
   words[5] = 'Five';
   words[6] = 'Six';
   words[7] = 'Seven';
   words[8] = 'Eight';
   words[9] = 'Nine';
   words[10] = 'Ten';
   words[11] = 'Eleven';
   words[12] = 'Twelve';
   words[13] = 'Thirteen';
   words[14] = 'Fourteen';
   words[15] = 'Fifteen';
   words[16] = 'Sixteen';
   words[17] = 'Seventeen';
   words[18] = 'Eighteen';
   words[19] = 'Nineteen';
   words[20] = 'Twenty';
   words[30] = 'Thirty';
   words[40] = 'Forty';
   words[50] = 'Fifty';
   words[60] = 'Sixty';
   words[70] = 'Seventy';
   words[80] = 'Eighty';
   words[90] = 'Ninety';
   amount = amount.toString();
   var atemp = amount.split(".");
   var number =atemp[0].split(",").join("").toString();
   var n_length = number.length;
   var words_string = "";
   if (n_length <= 9) {
       var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
       var received_n_array = new Array();
       for (var i = 0; i < n_length; i++) {
           received_n_array[i] = number.substr(i, 1);
       }
       for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
           n_array[i] = received_n_array[j];
       }
       for (var i = 0, j = 1; i < 9; i++, j++) {
           if (i == 0 || i == 2 || i == 4 || i == 7) {
               if (n_array[i] == 1) {
                   n_array[j] = 10 + n_array[j];
                   n_array[i] = 0;
               }
           }
       }
       var value = 0;
       for (var i = 0; i < 9; i++) {
           if (i == 0 || i == 2 || i == 4 || i == 7) {
               value = n_array[i] * 10;
           } else {
               value = n_array[i];
           }
           if (value != 0) {
               words_string += words[value] + " ";
           }
           if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Crores ";
           }
           if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Lakhs ";
           }
           if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
               words_string += "Thousand ";
           }
           if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
               words_string += "Hundred and ";
           } else if (i == 6 && value != 0) {
               words_string += "Hundred ";
           }
       }
       words_string = words_string.split("  ").join(" ");
   }
   return words_string;
 }
