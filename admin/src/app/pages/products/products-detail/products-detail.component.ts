import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AttributeInputMode } from '../../../shared/Enums/attributes.enum';
import { ProductStatus } from '../../../shared/Enums/products.enum';
import { Attribute } from '../../../shared/Interfaces/attribute.interface';
import { Product } from '../../../shared/Interfaces/product.interface';
import { AttributesService } from '../../categories/attributes.service';
import { CategoriesService } from '../../categories/categories.service';
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
  fileList: NzUploadFile[] = [];
  productStatus = ProductStatus;
  attributes: Attribute[] = [];

  removedFileList: number[] = [];
  productId: number;
  isNew = true;
  isLoading = false;
  isBtnLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';
  storeUrl = environment.storeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private attributesService: AttributesService,
    private categoriesService: CategoriesService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      originalPrice: ['', [Validators.required]],
      status: [''],
      categoryId: ['', [Validators.required]],
      attributes: this.fb.array([])
    });

    this.getCategoryTree();

    this.activatedRoute.params.subscribe(({ productId }) => {
      this.productId = productId;

      this.isNew = productId === 'new';
      if (!this.isNew) this.renderProductDetailPage();
      else {
        this.attributeFormArray.clear();
        this.productForm.reset();
        this.attributes = [];
        this.fileList = [];
      }
    });
  }

  get attributeFormArray() {
    return this.productForm.get('attributes') as FormArray;
  }

  renderProductDetailPage() {
    this.isLoading = true;
    this.productsService.getOne(this.productId).subscribe(
      (response) => {
        this.product = response;
        this.productForm.patchValue({
          title: this.product.title,
          description: this.product.description,
          price: this.product.price,
          originalPrice: this.product.originalPrice,
          status: this.product.status,
          categoryId: this.product?.category?.id || ''
        });

        this.changeCategoryAttributes(this.product.category.id);

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

  getCategoryTree() {
    this.isLoading = true;
    this.categoriesService.getMany().subscribe(
      (response) => {
        this.categoryTree = response;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  changeCategoryAttributes(categoryId: number) {
    this.attributeFormArray.clear();
    this.attributesService.getMany(categoryId.toString()).subscribe((response) => {
      this.attributes = response;
      const withData = !this.isNew && this.product.category.id === categoryId;
      this.renderAttributeForm(withData);
    });
  }

  renderAttributeForm(withData = false) {
    this.attributes.forEach((attribute) => {
      const defaultInputMode = attribute.inputMode === AttributeInputMode.DEFAULT;
      let value: any = defaultInputMode ? '' : [];

      if (withData) {
        const attributeValues = this.product.attributes.find(
          (attr) => attr.id === attribute.id
        )?.attributeValues;

        if (attributeValues) {
          if (defaultInputMode) value = attributeValues[0].id;
          else value = attributeValues.map((attributeValue) => attributeValue.id);
        }
      }

      this.attributeFormArray.push(this.fb.control(value, attribute.mandatory ? Validators.required : null));
    });
  }

  createNewAttributeValue(attributeValueName: string, attributeId: number) {
    this.attributesService
      .createAttributeValue(attributeId, { name: attributeValueName })
      .pipe(
        switchMap((response) => this.attributesService.getOne(attributeId)),
        catchError((error) => throwError(error))
      )
      .subscribe(
        (response) => {
          const attributeIndex = this.attributes.findIndex((attribute) => attribute.id === attributeId);
          this.attributes[attributeIndex] = response;
        },
        (error) => this.messageService.error(error?.error?.message)
      );
  }

  updateProduct() {
    this.isBtnLoading = true;
    this.productsService.updateOne(this.product.id, this.prepareFormDataForSaving()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  createProduct() {
    this.isBtnLoading = true;
    this.productsService.createOne(this.prepareFormDataForSaving()).subscribe(
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

  prepareFormDataForSaving(): FormData {
    const formData = new FormData();

    for (const formControlName in this.productForm.value) {
      if (this.productForm.value[formControlName] && formControlName !== 'attributes')
        formData.append(formControlName, this.productForm.value[formControlName]);
    }

    // Flatten the value of the multiple-choice attribute
    // and exclude the value of the non-required attribute
    const attributeValueIds = this.attributeFormArray.value.flat().filter(Boolean) as any;
    if (attributeValueIds.length) formData.append('attributeValueIds', attributeValueIds);

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
