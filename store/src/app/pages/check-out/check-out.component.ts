import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { forkJoin, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Cart } from '../../shared/Interfaces/cart.interface';
import { Customer } from '../../shared/Interfaces/customer.interface';
import { ShippingMethod } from '../../shared/Interfaces/shipping.interface';
import { TransactionMethod } from '../../shared/Interfaces/transaction.interface';
import { CartService } from '../cart/cart.service';
import { CustomerService } from '../customer/customer.service';
import { CheckOutService } from './check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  orderForm: UntypedFormGroup;
  addressForm: UntypedFormGroup;
  cart: Cart;
  customer: Customer;
  cartSubscription: Subscription;

  isLoading = false;
  isUpdateLoading = false;
  isProcessingOrder = false;
  isAddressModalVisible = false;
  success = false;
  error = false;

  constructor(
    private titleService: Title,
    private fb: UntypedFormBuilder,
    private checkOutService: CheckOutService,
    private cartService: CartService,
    private customerService: CustomerService
  ) {
    this.titleService.setTitle('Thanh toán | OlympicBooks');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initForms();

    forkJoin([this.cartService.cart$.pipe(take(1)), this.customerService.getMe()]).subscribe((response) => {
      [this.cart, this.customer] = response;

      this.orderForm.setValue({
        shippingMethodId: this.cart.shippingMethods[0]?.id,
        transactionMethodId: this.cart.transactionMethods[0]?.id,
        buyerNote: ''
      });

      this.isLoading = false;

      if (!this.customer.address || !this.customer.phoneNumber) this.showAddressModal();
    });

    this.cartSubscription = this.cartService.cart$.subscribe((response) => (this.cart = response));
  }

  initForms(): void {
    this.orderForm = this.fb.group({
      shippingMethodId: [null, [Validators.required]],
      transactionMethodId: [null, [Validators.required]],
      buyerNote: [null]
    });

    this.addressForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  setAddressForm() {
    this.addressForm.setValue({
      name: this.customer.name,
      phoneNumber: this.customer.phoneNumber,
      address: this.customer.address
    });
  }

  showAddressModal(): void {
    this.setAddressForm();
    this.isAddressModalVisible = true;
  }

  hideAddressModal(): void {
    this.isAddressModalVisible = false;
  }

  updateAddress(): void {
    this.isUpdateLoading = true;
    this.customerService.updateMe(this.addressForm.value).subscribe((response) => {
      this.customer = response;
      this.isUpdateLoading = false;
      this.isAddressModalVisible = false;
      this.addressForm.markAsPristine();
      this.addressForm.updateValueAndValidity();
    });
  }

  changeShippingValue(method: ShippingMethod): void {
    if (method.disabled) return;

    this.cartService.setCart(method.id);
  }

  changeTransactionMethod(method: TransactionMethod): void {
    if (method.disabled) return;

    this.orderForm.setValue({
      ...this.orderForm.value,
      transactionMethodId: method.id
    });
  }

  processOrder(): void {
    if (!this.customer.address || !this.customer.phoneNumber) {
      this.showAddressModal();
      return;
    }

    this.isProcessingOrder = true;
    this.checkOutService.createOrder(this.orderForm.value).subscribe(
      (response) => {
        this.cartService.setCart();
        this.isProcessingOrder = false;
        this.success = true;
      },
      (error) => {
        this.isProcessingOrder = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
