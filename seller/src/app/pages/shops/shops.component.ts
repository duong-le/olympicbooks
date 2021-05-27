import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { ShopsService } from './shops.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  shopForm: FormGroup;
  fileList: NzUploadFile[] = [];

  shopId: number;
  isUpdateShopModalVisible = false;
  isUpdateShopLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private shopsService: ShopsService,
    private messageService: NzMessageService
  ) {}

  ngOnInit() {
    this.shopForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.activatedRoute.parent.params.subscribe(({ shopId }) => {
      this.shopId = shopId;
      this.renderProfilePage();
    });
  }

  renderProfilePage() {
    this.shopsService.getOne(this.shopId).subscribe((response) => {
      this.shopForm.setValue({
        name: response.name,
        description: response.description
      });

      if (response.coverImgName && response.coverImgUrl) {
        this.fileList = [
          {
            uid: String(response.id),
            status: 'done',
            name: response.coverImgName,
            url: response.coverImgUrl,
            thumbUrl: response.coverImgUrl
          }
        ];
      }
    });
  }

  updateShop(): void {
    const shopFormData = this.prepareFormDataForUpdateShop();

    this.isUpdateShopLoading = true;
    this.shopsService.updateOne(this.shopId, shopFormData).subscribe(
      (response) => {
        this.messageService.success('Cập nhật thành công!');
        if (response.coverImgName && response.coverImgUrl) {
          this.fileList = [
            {
              uid: String(response.id),
              status: 'done',
              name: response.coverImgName,
              url: response.coverImgUrl,
              thumbUrl: response.coverImgUrl
            }
          ];
        }
        this.shopForm.markAsPristine();
        this.isUpdateShopLoading = false;
      },
      (error) => {
        this.messageService.error(error?.error?.message);
        this.isUpdateShopLoading = false;
      }
    );
  }

  prepareFormDataForUpdateShop() {
    const formData = new FormData();
    formData.append('name', this.shopForm.controls['name'].value);
    formData.append('description', this.shopForm.controls['description'].value);
    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);
    return formData;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.shopForm.markAsDirty();
    return false;
  };
}
