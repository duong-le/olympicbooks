import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ProductStatus } from '../../../shared/Enums/products.enum';
import { Product } from '../../../shared/Interfaces/product.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  productStatus = ProductStatus;

  productId: number;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      status: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ productId }) => {
      this.productId = productId;
      this.renderProductDetailPage();
    });
  }

  renderProductDetailPage() {
    this.productsService.getOne(this.productId).subscribe(
      (response) => {
        this.product = response;
        this.productForm.setValue({
          status: this.product.status
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
    this.productsService.updateOne(this.productId, this.productForm.value).subscribe(
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
