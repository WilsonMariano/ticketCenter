import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    alert(window.innerWidth);
    var code = '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101'
    ​
    var table = document.getElementById("table");
    var td = document.createElement("td");
    
    for(var i = 0; i < code.length; i++) {
      if( code[i]== "1" ) {
        td.style.backgroundColor = "black"; 
      } else {
        td.style.backgroundColor = "white"; 
      }
      table.appendChild(td);
    }
    
  }

}
