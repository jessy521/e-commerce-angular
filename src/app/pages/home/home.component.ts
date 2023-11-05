import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 355, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}
  cols: number = 3;
  category: String | undefined;
  rowHeight: number = ROW_HEIGHT[this.cols];
  products: Product[] | undefined;
  limit: string = '12';
  sort: string = 'desc';
  productSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .subscribe((_products) => (this.products = _products));
  }

  onColumnsCountChange(colNum: number): void {
    this.cols = colNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: String): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onSortChange(newSort: string) {
    this.sort = newSort;
    this.getProducts();
  }
  onItemsCountChange(newLimit: number) {
    this.limit = newLimit.toString();
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
