import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Cart, CartItem } from '../../shared/Interfaces/cart.interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;
  emptyCart = { totalQty: 0, totalValue: 0, cartItems: [] };

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.cartSubject = new BehaviorSubject<Cart>(this.emptyCart);
    this.cart$ = this.cartSubject.asObservable();

    this.authenticationService.user$.subscribe((user) => {
      if (user) this.getCart().subscribe((response) => this.setCart(response));
      else this.clearCart();
    });
  }

  public get cartValue() {
    return this.cartSubject.value;
  }

  setCart(cartItems: CartItem[]) {
    if (cartItems.length) {
      const totalQty = this.calculateTotalQty(cartItems);
      const totalValue = this.calculateTotalValue(cartItems);
      this.cartSubject.next({ ...this.cartValue, totalQty, totalValue, cartItems });
    } else this.clearCart();
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/mine/carts`);
  }

  createCartItem(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${environment.apiUrl}/mine/carts`, { productId, quantity });
  }

  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${environment.apiUrl}/mine/carts/${id}`, { quantity });
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/mine/carts/${id}`);
  }

  deleteCart(): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/mine/carts`);
  }

  clearCart() {
    this.cartSubject.next(this.emptyCart);
  }

  calculateTotalQty(cartItems: CartItem[]) {
    return cartItems.reduce((total, current) => (total += current.quantity), 0);
  }

  calculateTotalValue(cartItems: CartItem[]) {
    return cartItems.reduce((total, current) => (total += current.quantity * current.product.price), 0);
  }
}
