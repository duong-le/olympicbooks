import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShopStatus } from '../../shared/Enums/shops.enum';
import { Shop } from '../../shared/Interfaces/shop.interface';
import { ShopsService } from '../shops/shops.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shop: Shop;

  shopId: number;
  isCollapsed = false;
  isBannerShowing = false;
  bannerType: 'success' | 'info' | 'warning' | 'error';
  bannerMessage: string;
  bannerMap = {
    [ShopStatus.UNLISTED]: {
      bannerType: 'info',
      bannerMessage: 'Cửa hàng đang ở chế độ tạm nghỉ. Cập nhật hồ sơ để thay đổi trạng thái của cửa hàng.'
    },
    [ShopStatus.UNAPPROVED]: {
      bannerType: 'warning',
      bannerMessage:
        'Cửa hàng đang được xét duyệt. Vui lòng liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ thêm.'
    },
    [ShopStatus.BANNED]: {
      bannerType: 'error',
      bannerMessage:
        'Cửa hàng đã bị khoá do vi phạm nguyên tắc bán hàng. Vui lòng liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ thêm.'
    }
  };

  constructor(private shopsService: ShopsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.renderShopPage();
    });
  }

  renderShopPage() {
    this.shopsService.getOne(this.shopId).subscribe((response) => {
      this.shop = response;

      if (this.shop.status !== ShopStatus.ACTIVE) {
        this.isBannerShowing = true;
        this.bannerType = this.bannerMap[this.shop.status].bannerType as any;
        this.bannerMessage = this.bannerMap[this.shop.status].bannerMessage;
      }
    });
  }
}
