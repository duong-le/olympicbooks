import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../orders.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order } from 'src/app/shared/Interfaces/order.interface';
import { DeliveryState } from 'src/app/shared/Enums/delivery-state.enum';
import { TransactionState } from 'src/app/shared/Enums/transaction-state.enum';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  orderForm: FormGroup;
  order: Order;
  isLoading = true;
  isBtnLoading = false;
  deliveryState = DeliveryState;
  transactionState = TransactionState;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      buyerNote: { value: '', disabled: true },
      sellerNote: [''],
      shipping: this.fb.group({
        id: { value: '', disabled: true },
        state: [''],
        code: [''],
        fee: [''],
        shippingMethod: { value: '', disabled: true },
        deliveryDate: { value: '', disabled: true },
        name: { value: '', disabled: true },
        address: { value: '', disabled: true },
        phoneNumber: { value: '', disabled: true }
      }),
      transaction: this.fb.group({
        id: { value: '', disabled: true },
        state: [''],
        transactionMethod: { value: '', disabled: true },
        value: { value: '', disabled: true }
      })
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.renderOrder(id);
    });
  }

  renderOrder(id: number) {
    this.ordersService.getOne(id).subscribe((response) => {
      this.order = response;
      this.orderForm.setValue({
        buyerNote: this.order.buyerNote,
        sellerNote: this.order.sellerNote,
        shipping: {
          id: this.order.shipping.id,
          state: this.order.shipping.state,
          code: this.order.shipping.code,
          fee: this.order.shipping.fee,
          shippingMethod: this.order.shipping.shippingMethod.description,
          deliveryDate: this.order.shipping.deliveryDate,
          name: this.order.shipping.name,
          address: this.order.shipping.address,
          phoneNumber: this.order.shipping.phoneNumber
        },
        transaction: {
          id: this.order.transaction.id,
          state: this.order.transaction.state,
          transactionMethod: this.order.transaction.transactionMethod.description,
          value: this.order.transaction.value
        }
      });
      this.isLoading = false;
    });
  }

  update() {
    this.isBtnLoading = true;
    this.ordersService.updateOne(this.order.id, this.orderForm.value).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.router.navigate(['/', 'orders']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }
}
