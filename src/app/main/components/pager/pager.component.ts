import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FxGlobalsService } from '../../services/fx-globals.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

    @Input() items: any[];
    @Input() pageSize : number = 5;
    @Output() pageChanged = new EventEmitter();
    pager: any = {};
    pagedItems: any[];
 

  constructor(private fxGblService : FxGlobalsService) { }

  ngOnInit(): void {
    this.fxGblService.showSpinner();
    setTimeout(() => {
      this.setPage(1);
      this.fxGblService.hideSpinner();
    }, 3000); 
  }

  public setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this.items.length, page, this.pageSize);

    // get current page of items
    this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pageChanged.emit(this.pagedItems);
  }

  private changePageSize(newPageSize : number):void{
    this.pageSize = newPageSize;
    this.setPage(1);
  }

  private getPager(totalItems: number, currentPage: number, pageSize: number) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    let startPage: number, endPage: number;
    if (totalPages <= 6) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 6;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages;
      } else {
        startPage = currentPage - 4;
        endPage = currentPage + 2;
      }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
