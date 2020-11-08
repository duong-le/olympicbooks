import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Cart } from 'src/app/shared/Interfaces/cart.interface';
import { Customer } from 'src/app/shared/Interfaces/customer.interface';
import { TransactionMethod } from 'src/app/shared/Interfaces/transaction.interface';
import { ShippingMethod } from 'src/app/shared/Interfaces/shipping.interface';
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
  isModalVisible = false;
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
    this.titleService.setTitle('Thanh toán | OlympicBooks');
  }

  ngOnInit() {
    this.isLoading = true;
    this.initForms();

    this.cartService.cart$.subscribe((response) => (this.cart = response));
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

      this.changeShippingMethod();

      if (!this.orderForm.value.shipping.address || !this.orderForm.value.shipping.phoneNumber) this.showModal();
      this.isLoading = false;
    });
  }

  initForms() {
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

  showModal() {
    this.addressForm.setValue({
      name: this.orderForm.value.shipping.name,
      phoneNumber: this.orderForm.value.shipping.phoneNumber,
      address: this.orderForm.value.shipping.address,
      buyerNote: this.orderForm.value.buyerNote
    });
    this.isModalVisible = true;
  }

  cancelModal() {
    this.isModalVisible = false;
  }

  updateAddress() {
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
        this.isModalVisible = false;
        this.addressForm.markAsPristine();
        this.addressForm.updateValueAndValidity();
      });
  }

  changeShippingMethod() {
    const shippingMethod = this.shippingMethods.find(
      (method) => method.id === this.orderForm.value.shipping.shippingMethodId
    );
    if (shippingMethod) this.cartService.changeShippingValue(shippingMethod.fee);
  }

  processOrder() {
    if (!this.orderForm.value.shipping.address || !this.orderForm.value.shipping.phoneNumber) this.showModal();
    else {
      this.isProcessingOrder = true;
      this.checkOutService
        .createOrder({
          ...this.orderForm.value,
          orderItems: this.cart.cartItems.map((el) => ({ quantity: el.quantity, productId: el.product.id }))
        })
        .pipe(
          switchMap((response) => {
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
