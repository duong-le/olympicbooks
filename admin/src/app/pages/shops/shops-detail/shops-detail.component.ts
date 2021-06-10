import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ShopStatus } from 'src/app/shared/Enums/shops.enum';
import { Shop } from 'src/app/shared/Interfaces/shop.interface';

import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-shops-detail',
  templateUrl: './shops-detail.component.html',
  styleUrls: ['./shops-detail.component.scss']
})
export class ShopsDetailComponent implements OnInit {
  shopForm: FormGroup;
  shop: Shop;
  shopStatus = ShopStatus;

  shopId: number;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private shopsService: ShopsService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      status: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.renderShopDetailPage();
    });
  }

  renderShopDetailPage() {
    this.shopsService.getOne(this.shopId).subscribe(
      (response) => {
        this.shop = response;
        this.shopForm.setValue({
          status: this.shop.status
        });
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  update() {
    this.isBtnLoading = true;
    this.shopsService.updateOne(this.shopId, this.shopForm.value).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.goBack();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
