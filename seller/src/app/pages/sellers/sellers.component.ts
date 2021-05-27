import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { Seller } from '../../shared/Interfaces/seller.interface';
import { ShopsService } from '../shops/shops.service';
import { SellersService } from './sellers.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {
  seller: Seller;
  shopForm: FormGroup;
  fileList: NzUploadFile[] = [];

  isCreateShopModalVisible = false;
  isCreateLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';

  constructor(
    private fb: FormBuilder,
    private sellersService: SellersService,
    private shopsService: ShopsService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.getSeller();
  }

  getSeller() {
    this.sellersService.getOne().subscribe((response) => {
      this.seller = response;
    });
  }

  showCreateShopModal(): void {
    this.isCreateShopModalVisible = true;
  }

  hideCreateShopModal(): void {
    this.isCreateShopModalVisible = false;
  }

  createShop(): void {
    this.isCreateLoading = true;
    const shopFormData = this.prepareFormDataForCreateShop();

    this.shopsService.createOne(shopFormData).subscribe(
      (response) => {
        this.messageService.success('Thêm mới thành công!');
        this.isCreateLoading = false;
        this.hideCreateShopModal();
        this.resetShopForm();
        this.getSeller();
      },
      (error) => {
        this.messageService.error(error?.error?.message);
        this.isCreateLoading = false;
        this.hideCreateShopModal();
        this.resetShopForm();
      }
    );
  }

  resetShopForm() {
    this.shopForm.reset();
    this.shopForm.updateValueAndValidity();
    this.fileList = [];
  }

  prepareFormDataForCreateShop() {
    const formData = new FormData();
    formData.append('name', this.shopForm.controls['name'].value);
    formData.append('description', this.shopForm.controls['description'].value);
    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);
    return formData;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
