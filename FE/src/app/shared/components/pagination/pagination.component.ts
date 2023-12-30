import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  totalPage: number = 0;
  @Input() totalRecords!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() pageIndexChange = new EventEmitter<number>();
  
  public constructor() {}
  ngOnInit(): void {
      this.totalPage = Math.ceil(this.totalRecords / this.pageSize);
  }
  public changePageIndex(index: number) {
    this.pageIndexChange.emit(index);
  }
}
