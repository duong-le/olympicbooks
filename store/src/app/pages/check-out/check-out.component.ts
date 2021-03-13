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
  orderId: number;
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
            shipping: {
              name: this.customer.name,
              phoneNumber: this.customer.phoneNumber,
              address: this.customer.address,
              shippingMethodId: this.shippingMethods[0]?.id
            },
            transaction: { transactionMethodId: this.transactionMethods[0]?.id },
            buyerNote: ''
          });
          this.changeShippingValue(this.shippingMethods[0]);
          this.isLoading = false;

          if (!this.orderForm.value.shipping.address || !this.orderForm.value.shipping.phoneNumber) this.showAddressModal();
        });
      }
    });
  }

  initForms(): void {
    this.orderForm = this.fb.group({
      shipping: this.fb.group({
        name: [null, [Validators.required]],
        phoneNumber: [null, [Validators.required]],
        address: [null, [Validators.required]],
        shippingMethodId: [null, [Validators.required]]
      }),
      transaction: this.fb.group({
        transactionMethodId: [null, [Validators.required]]
      }),
      buyerNote: [null]
    });

    this.addressForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      buyerNote: [null]
    });
  }

  showAddressModal(): void {
    this.addressForm.setValue({
      name: this.orderForm.value.shipping.name,
      phoneNumber: this.orderForm.value.shipping.phoneNumber,
      address: this.orderForm.value.shipping.address,
      buyerNote: this.orderForm.value.buyerNote
    });
    this.isAddressModalVisible = true;
  }

  cancelAddressModal(): void {
    this.isAddressModalVisible = false;
  }

  updateAddress(): void {
    this.isUpdateLoading = true;
    this.customerService
      .updateMe({
        address: this.addressForm.value.address,
        phoneNumber: this.addressForm.value.phoneNumber
      })
      .subscribe((response) => {
        this.customer = response;
        this.orderForm.setValue({
          ...this.orderForm.value,
          shipping: {
            ...this.orderForm.value.shipping,
            name: this.addressForm.value.name,
            phoneNumber: this.customer.phoneNumber,
            address: this.customer.address
          },
          buyerNote: this.addressForm.value.buyerNote
        });

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
      transaction: {
        transactionMethodId: method.id
      }
    });
  }

  processOrder(): void {
    if (!this.orderForm.value.shipping.address || !this.orderForm.value.shipping.phoneNumber) {
      this.showAddressModal();
      return;
    }

    this.isProcessingOrder = true;
    const orderItems = this.cart.cartItems.map((el) => ({ quantity: el.quantity, productId: el.product.id }));
    this.checkOutService
      .createOrder({ ...this.orderForm.value, orderItems })
      .pipe(
        switchMap((response) => {
          this.orderId = response['id'];
          return this.cartService.deleteCart();
        })
      )
      .subscribe(
        (response) => {
          this.cartService.clearCart();
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
