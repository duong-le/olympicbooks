import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartItem } from 'src/app/shared/Interfaces/cart.interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.cartSubject = new BehaviorSubject<Cart>({ totalQty: 0, discountValue: 0, shippingValue: 0 });
    this.cart$ = this.cartSubject.asObservable();

    this.authenticationService.user$.subscribe((user) => {
      if (user) this.getCart().subscribe((response) => this.setCart(response));
      else this.emptyCart();
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
    } else this.emptyCart();
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

  emptyCart() {
    this.cartSubject.next({ totalQty: 0, totalValue: 0, shippingValue: 0, discountValue: 0, cartItems: [] });
  }

  calculateTotalQty(cartItems: CartItem[]) {
    return cartItems.reduce((total, current) => (total += current.quantity), 0);
  }

  calculateTotalValue(cartItems: CartItem[]) {
    return cartItems.reduce((total, current) => (total += current.quantity * current.product.price), 0);
  }

  changeShippingValue(value: number) {
    this.cartSubject.next({ ...this.cartValue, shippingValue: value });
  }

  changeDiscountValue(value: number) {
    this.cartSubject.next({ ...this.cartValue, discountValue: value });
  }
}
