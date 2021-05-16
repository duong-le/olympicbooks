import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
export class CheckOutComponent implements OnInit {
  orderForm: FormGroup;
  addressForm: FormGroup;
  cart: Cart;
  customer: Customer;
  transactionMethods: TransactionMethod[];
  shippingMethods: ShippingMethod[];

  isLoading = false;
  isUpdateLoading = false;
  isProcessingOrder = false;
  isAddressModalVisible = false;
  success = false;
  error = false;
  shippingValue = 0;
  discountValue = 0;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private checkOutService: CheckOutService,
    private cartService: CartService,
    private customerService: CustomerService
  ) {
    this.titleService.setTitle('Thanh toán | OlympicBooks');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initForms();

    this.cartService.cart$.subscribe((response) => {
      this.cart = response;
      this.isLoading = false;

      if (this.cart.cartItems.length) {
        this.isLoading = true;
        forkJoin([
          this.customerService.getMe(),
          this.checkOutService.getTransactionMethods(),
          this.checkOutService.getShippingMethods(this.cart.totalValue)
        ]).subscribe((response) => {
          [this.customer, this.transactionMethods, this.shippingMethods] = response;

          this.orderForm.setValue({
            shippingMethodId: this.shippingMethods[0]?.id,
            transactionMethodId: this.transactionMethods[0]?.id
          });
          this.changeShippingValue(this.shippingMethods[0]);

          this.setAddressForm();
          this.isLoading = false;

          if (!this.addressForm.value.address || !this.addressForm.value.phoneNumber) this.showAddressModal();
        });
      }
    });
  }

  initForms(): void {
    this.orderForm = this.fb.group({
      shippingMethodId: [null, [Validators.required]],
      transactionMethodId: [null, [Validators.required]]
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
    this.isAddressModalVisible = true;
  }

  hideAddressModal(): void {
    this.isAddressModalVisible = false;
  }

  updateAddress(): void {
    this.isUpdateLoading = true;
    this.customerService.updateMe(this.addressForm.value).subscribe((response) => {
      this.customer = response;
      this.setAddressForm();

      this.isUpdateLoading = false;
      this.isAddressModalVisible = false;
      this.addressForm.markAsPristine();
      this.addressForm.updateValueAndValidity();
    });
  }

  changeShippingValue(method: ShippingMethod): void {
    this.shippingValue = method.fee;
  }

  changeTransactionMethod(method: TransactionMethod): void {
    this.orderForm.setValue({
      ...this.orderForm.value,
      transactionMethodId: method.id
    });
  }

  processOrder(): void {
    if (!this.addressForm.value.address || !this.addressForm.value.phoneNumber) {
      this.showAddressModal();
      return;
    }

    this.isProcessingOrder = true;
    this.checkOutService
      .createOrder(this.orderForm.value)
      .pipe(switchMap((response) => this.cartService.getCart()))
      .subscribe(
        (response) => {
          this.cartService.setCart(response);
          this.isProcessingOrder = false;
          this.success = true;
        },
        (error) => {
          this.isProcessingOrder = false;
          this.error = true;
        }
      );
  }
}
