import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { forkJoin } from 'rxjs';

import { AuthorsService } from '../../../pages/authors/authors.service';
import { CategoriesService } from '../../../pages/categories/categories.service';
import { PublishersService } from '../../../pages/publishers/publishers.service';
import { Author } from '../../../shared/Interfaces/author.interface';
import { Pagination } from '../../../shared/Interfaces/pagination.interface';
import { Product } from '../../../shared/Interfaces/product.interface';
import { Publisher } from '../../../shared/Interfaces/publisher.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categoryTree: NzTreeNodeOptions[] = [];
  publishers: Pagination<Publisher[]> | Publisher[];
  authors: Pagination<Author[]> | Author[];
  fileList: NzUploadFile[] = [];
  removedFileList: number[] = [];

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
    private router: Router
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
      inStock: [true, [Validators.required]],
      categoryId: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      authorIds: [[], [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ id }) => {
      this.isNew = id === 'new';
      this.renderDependencies();
      if (!this.isNew) this.renderProduct(id);
    });
  }

  renderProduct(id: number) {
    this.isLoading = true;
    this.productsService.getOne(id).subscribe((response) => {
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
        inStock: this.product.inStock,
        categoryId: this.product.category.id,
        publisherId: this.product.publisher.id,
        authorIds: this.product.authors.map((author) => author.id)
      });
      this.fileList = this.product.images.map((image) => ({
        uid: String(image.id),
        status: 'done',
        name: image.imgName,
        url: image.imgUrl
      }));
      this.isLoading = false;
    });
  }

  renderDependencies() {
    this.isLoading = true;
    forkJoin([
      this.categoriesService.getMany(),
      this.publishersService.getMany(null),
      this.authorsService.getMany(null)
    ]).subscribe((response) => {
      [this.categoryTree, this.publishers, this.authors] = response;
      this.isLoading = false;
    });
  }

  update() {
    this.isBtnLoading = true;
    this.productsService.updateOne(this.productForm.controls['id'].value, this.createFormData()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.router.navigate(['/', 'products']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  create() {
    this.isBtnLoading = true;
    this.productsService.createOne(this.createFormData()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Thêm mới thành công!');
        this.router.navigate(['/', 'products']);
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

    for (const formControl in this.productForm.value) formData.append(formControl, this.productForm.value[formControl]);
    if (this.fileList.length)
      this.fileList.forEach((file: NzUploadFile) => {
        if (!file.url) formData.append('attachment', file as any);
      });
    if (this.removedFileList.length) formData.append('removedImageIds', this.removedFileList as any);

    return formData;
  }
}
