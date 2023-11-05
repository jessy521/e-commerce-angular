import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private readonly cartService: CartService) {}

  private _cart: Cart = { items: [] };
  itemQuantity: number = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemQuantity = cart.items
      .map((item: CartItem) => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  getTotal(items: CartItem[]) {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
