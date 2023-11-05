import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) {}

  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else items.push(item);

    this.cart.next({ items });
    this._snackbar.open('1 item added to cart', 'OK', { duration: 3000 });
    console.log(this.cart.value);
  }

  getTotal(items: CartItem[]) {
    return items
      .map((items) => items.price * items.quantity)
      .reduce((sum, itemPrice) => sum + itemPrice, 0);
  }
  clearCart(): void {
    this.cart.next({ items: [] });

    this._snackbar.open('cart is cleared', 'OK', { duration: 3000 });
  }

  removeFromCart(item: CartItem, notify = true): CartItem[] {
    console.log('deleting item from cart');
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (notify) {
      this.cart.next({ items: filteredItems });
      this._snackbar.open(`${item.name} removed from cart`, 'OK', {
        duration: 3000,
      });
    }
    return filteredItems;
  }

  removeItemQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity <= 0) itemForRemoval = _item;
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackbar.open('1 item removed from your cart', 'OK', {
      duration: 3000,
    });
  }
}
