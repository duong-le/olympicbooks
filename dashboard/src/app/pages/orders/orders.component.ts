import { Component, TemplateRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/Base/base.component';
import { OrdersService } from './orders.service';
import { Order } from 'src/app/shared/Interfaces/order.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent<Order> {
  columns = [
    { title: 'Actions' },
    { title: 'ID', key: 'id', sort: true },
    { title: 'Mã vận chuyển', key: 'shipping.code', sort: true },
    { title: 'Ngày mua', key: 'createdAt', sort: true },
    { title: 'Giao hàng', key: 'shipping.state', sort: true },
    { title: 'Thanh Toán', key: 'transaction.state', sort: true },
    { title: 'Người nhận' },
    { title: 'Phí vận chuyển', key: 'shipping.fee', sort: true },
    { title: 'Tổng tiền', key: 'transaction.value', sort: true }
    // { title: 'Giảm giá' }
  ];

  constructor(
    private ordersService: OrdersService,
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) {
    super(ordersService);
  }

  showDeleteConfirm(id: number) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete(id)
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.ordersService.deleteOne(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.renderPage();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  showProductsModal(modalContent: TemplateRef<{}>, item: Order): void {
    this.modalService.create({
      nzTitle: 'Chi tiết đơn hàng',
      nzContent: modalContent,
      nzWidth: '75%',
      nzMaskClosable: true,
      nzClosable: true,
      nzFooter: null,
      nzComponentParams: item
    });
  }
}
