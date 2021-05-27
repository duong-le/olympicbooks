import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { forkJoin } from 'rxjs';

import { ProductStatus, SellerProductStatus } from '../../../shared/Enums/products.enum';
import { Author } from '../../../shared/Interfaces/author.interface';
import { Product } from '../../../shared/Interfaces/product.interface';
import { Publisher } from '../../../shared/Interfaces/publisher.interface';
import { AuthorsService } from '../authors.service';
import { CategoriesService } from '../categories.service';
import { ProductsService } from '../products.service';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categoryTree: NzTreeNodeOptions[] = [];
  publishers: Publisher[];
  authors: Author[];
  fileList: NzUploadFile[] = [];
  productStatus = SellerProductStatus;

  removedFileList: number[] = [];
  shopId: number;
  productId: number;
  isNew = true;
  isLoading = false;
  isBtnLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private authorsService: AuthorsService,
    private publishersService: PublishersService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: { value: '', disabled: true },
      title: ['', [Validators.required]],
      pages: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      publicationYear: ['', [Validators.required]],
      price: ['', [Validators.required]],
      originalPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [''],
      categoryId: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      authorIds: [[], [Validators.required]]
    });

    this.renderDependencies();

    this.activatedRoute.params.subscribe(({ shopId, productId }) => {
      this.shopId = shopId;
      this.productId = productId;

      this.isNew = productId === 'new';
      if (!this.isNew) this.renderProduct();
    });
  }

  renderProduct() {
    this.isLoading = true;
    this.productsService.getOne(this.shopId, this.productId).subscribe(
      (response) => {
        this.product = response;
        this.productForm.setValue({
          id: this.product.id,
          title: this.product.title,
          pages: this.product.pages,
          weight: this.product.weight,
          publicationYear: this.product.publicationYear,
          price: this.product.price,
          originalPrice: this.product.originalPrice,
          description: this.product.description,
          status: this.product.status,
          categoryId: this.product?.category?.id || '',
          publisherId: this.product?.publisher?.id || '',
          authorIds: this.product.authors.map((author) => author.id)
        });
        if (this.product.status === ProductStatus.BANNED) {
          this.productForm.controls['status'].disable();
          this.productStatus = ProductStatus as any;
        }

        this.fileList = this.product.images.map((image) => ({
          uid: String(image.id),
          status: 'done',
          name: image.imgName,
          url: image.imgUrl
        }));

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  renderDependencies() {
    this.isLoading = true;
    forkJoin([
      this.categoriesService.getMany(),
      this.publishersService.getMany(),
      this.authorsService.getMany()
    ]).subscribe(
      (response) => {
        [this.categoryTree, this.publishers, this.authors] = response;
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
    this.productsService.updateOne(this.shopId, this.product.id, this.createFormData()).subscribe(
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

  create() {
    this.isBtnLoading = true;
    this.productsService.createOne(this.shopId, this.createFormData()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Thêm mới thành công!');
        this.goBack();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.productForm.markAsDirty();
    return false;
  };

  handleUploadEventChange(info: NzUploadChangeParam): void {
    if (info.type === 'removed' && info.file.url && !this.isNew) {
      this.removedFileList.push(Number(info.file.uid));
      this.productForm.markAsDirty();
    }
  }

  createFormData(): FormData {
    const formData = new FormData();

    for (const formControl in this.productForm.value)
      formData.append(formControl, this.productForm.value[formControl]);
    if (this.fileList.length)
      this.fileList.forEach((file: NzUploadFile) => {
        if (!file.url) formData.append('attachment', file as any);
      });
    if (this.removedFileList.length) formData.append('removedImageIds', this.removedFileList as any);

    return formData;
  }

  goBack() {
    this.location.back();
  }
}
