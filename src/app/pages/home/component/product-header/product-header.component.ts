import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css'],
})
export class ProductHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sortOrder: string = 'asc';
  itemCount: number = 12;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  arrangeSort(sort: string): void {
    this.sortOrder = sort;
    this.sortChange.emit(this.sortOrder);
  }

  onShow(show: number): void {
    this.itemCount = show;
    this.itemsCountChange.emit(this.itemCount);
  }

  onColumnsCountChange(cols: number): void {
    this.columnsCountChange.emit(cols);
  }
}
