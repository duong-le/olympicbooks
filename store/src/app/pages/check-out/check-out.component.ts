import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CheckOutService } from './check-out.service';
import { CartService } from '../cart/cart.service';
import { CustomerService } from '../customer/customer.service';
import { Cart } from 'src/app/shared/Interfaces/cart.interface';
import { Customer } from 'src/app/shared/Interfaces/customer.interface';
import { TransactionMethod } from 'src/app/shared/Interfaces/transaction.interface';
import { ShippingMethod } from 'src/app/shared/Interfaces/shipping.interface';
import { Order } from 'src/app/shared/Interfaces/order.interface';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  addressForm: FormGroup;
  cart: Cart;
  customer: Customer;
  transactionMethods: TransactionMethod[];
  shippingMethods: ShippingMethod[];
  order: Order;

  isLoading = false;
  isUpdateLoading = false;
  isProcessingOrder = false;
  isModalVisible = false;
  transactionRadioValue: string;
  shippingRadioValue: string;
  error = false;
  success = false;
  orderId: number;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private checkOutService: CheckOutService,
    private cartService: CartService,
    private customerService: CustomerService
  ) {
    this.titleService.setTitle('Thanh toán | Olympicbooks');
  }

  ngOnInit() {
    this.addressForm = this.fb.group({
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });

    this.cartService.cart$.subscribe((response) => (this.cart = response));

    this.isLoading = true;
    forkJoin(
      this.customerService.getMe(),
      this.checkOutService.getTransactionMethods(),
      this.checkOutService.getShippingMethods()
    ).subscribe((response) => {
      [this.customer, this.transactionMethods, this.shippingMethods] = response;

      this.transactionRadioValue = this.transactionMethods[0].method;
      this.shippingRadioValue = this.shippingMethods[0].method;

      this.order = {
        transaction: { transactionMethodId: this.transactionMethods[0].id },
        shipping: { shippingMethodId: this.shippingMethods[0].id, address: this.customer.address, phoneNumber: this.customer.phoneNumber },
        orderItems: this.cart.cartItems.map((el) => ({ quantity: el.quantity, productId: el.product.id }))
      };

      if (!this.customer.address || !this.customer.phoneNumber) this.showModal();
      this.isLoading = false;
    });
  }

  showModal() {
    this.addressForm.setValue({
      phoneNumber: this.customer.phoneNumber,
      address: this.customer.address
    });
    this.isModalVisible = true;
  }

  cancelModal() {
    this.isModalVisible = false;
  }

  updateAddress() {
    this.isUpdateLoading = true;
    this.customerService.updateMe(this.addressForm.value).subscribe((response) => {
      this.customer = response;
      this.order.shipping.address = response.address;
      this.order.shipping.phoneNumber = response.phoneNumber;
      this.isUpdateLoading = false;
      this.isModalVisible = false;
      this.addressForm.markAsPristine();
      this.addressForm.updateValueAndValidity();
    });
  }

  changeShippingMethod() {
    const method = this.shippingMethods.find((el) => el.method === this.shippingRadioValue);
    this.order.shipping.shippingMethodId = method.id;
    this.cartService.changeShippingValue(method.fee);
  }

  processOrder() {
    if (!this.customer.address || !this.customer.phoneNumber) this.showModal();
    else {
      this.isProcessingOrder = true;
      this.checkOutService
        .createOrder(this.order)
        .pipe(
          mergeMap((response) => {
            this.orderId = response['id'];
            return this.cartService.deleteCart();
          })
        )
        .subscribe(
          (response) => {
            this.cartService.emptyCart();
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
}
