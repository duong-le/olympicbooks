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
  emptyCart = {
    orderValue: 0,
    shippingFee: 0,
    quantity: 0,
    items: [],
    transactionMethods: [],
    shippingMethods: []
  };

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.cartSubject = new BehaviorSubject<Cart>(this.emptyCart);
    this.cart$ = this.cartSubject.asObservable();

    this.authenticationService.user$.subscribe((user) => {
      if (user) this.setCart();
      else this.clearCart();
    });
  }

  public get cart() {
    return this.cartSubject.value;
  }

  setCart(shippingMethodId: number = 0): void {
    const params = {
      shippingMethodId: String(shippingMethodId)
    };

    this.getCart(params).subscribe((response) => this.cartSubject.next(response));
  }

  getCart(params: { [key: string]: string | string[] }): Observable<Cart> {
    return this.http.get<Cart>(`${environment.apiUrl}/customers/me/carts`, { params });
  }

  createCartItem(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${environment.apiUrl}/customers/me/carts`, { productId, quantity });
  }

  updateCartItem(id: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(`${environment.apiUrl}/customers/me/carts/${id}`, { quantity });
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/customers/me/carts/${id}`);
  }

  deleteCart(): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/customers/me/carts`);
  }

  clearCart() {
    this.cartSubject.next(this.emptyCart);
  }
}
