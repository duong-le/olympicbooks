import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AttributeInputMode } from '../../../shared/Enums/attributes.enum';
import { Attribute } from '../../../shared/Interfaces/attribute.interface';
import { Category } from '../../../shared/Interfaces/category.interface';
import { AttributesService } from '../attributes.service';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.scss']
})
export class CategoriesDetailComponent implements OnInit, OnChanges {
  @Input() categoryId: number;
  @Input() isNew: boolean;
  @Input() categoryData: NzTreeNodeOptions[];
  @Output() notifyRender: EventEmitter<any> = new EventEmitter();
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();

  categoryForm: FormGroup;
  attributeForm: FormGroup;
  category: Category;
  attributes: Attribute[];
  categoryTree: NzTreeNodeOptions[] = [];
  fileList: NzUploadFile[] = [];
  attributeInputMode = AttributeInputMode;

  isLoading = false;
  isBtnLoading = false;
  isAttributeModalVisible = false;
  isSaveAttributeBtnLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';
  storeUrl = environment.storeUrl;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private attributesService: AttributesService,
    private messageService: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required]],
      parentId: [''],
      attributes: this.fb.array([])
    });

    this.attributeForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      inputMode: ['', [Validators.required]],
      mandatory: [false, [Validators.required]]
    });
  }

  ngOnChanges() {
    this.resetStateForRouting();
    if (!this.isNew && this.categoryId && this.categoryData) {
      this.renderCategoryDetailPage();
    }
    if (this.categoryData) this.categoryTree = this.categoryData;
    this.getAttributes();
  }

  get attributeFormArray() {
    return this.categoryForm.get('attributes') as FormArray;
  }

  get attributeIdFormControl() {
    return this.attributeForm.controls['id'];
  }

  renderCategoryDetailPage() {
    this.isLoading = true;
    this.categoriesService.getOne(this.categoryId).subscribe(
      (response) => {
        this.category = response;

        this.categoryForm.patchValue({
          title: this.category.title,
          // If category has parent(s), the closest parent is the second from the right
          parentId:
            this.category?.parents?.length > 1
              ? this.category.parents[this.category.parents.length - 2].id
              : null
        });

        if (this.category.imgName && this.category.imgUrl) {
          this.fileList = [
            {
              uid: String(this.category.id),
              status: 'done',
              name: this.category.imgName,
              url: this.category.imgUrl,
              thumbUrl: this.category.imgUrl
            }
          ];
        }

        for (const attribute of this.category.attributes) {
          this.addAttributeToFormArray(attribute);
        }

        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  updateCategory() {
    this.isBtnLoading = true;
    this.categoriesService.updateOne(this.categoryId, this.prepareCategoryFormDataForSaving()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.notifyRender.emit();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  createCategory() {
    this.isBtnLoading = true;
    this.categoriesService.createOne(this.prepareCategoryFormDataForSaving()).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Thêm mới danh mục thành công!');
        this.notifyRender.emit();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  showDeleteConfirmModal() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzContent: `<b>${
        this.category.isLeaf ? '' : 'Xoá danh mục này đồng nghĩa với việc tất cả danh mục con sẽ bị xoá theo'
      }</b>`,
      nzOkDanger: true,
      nzOnOk: () => this.deleteCategory()
    });
  }

  deleteCategory() {
    this.isLoading = true;
    this.categoriesService.deleteOne(this.categoryId).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.notifyDelete.emit();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.categoryForm.markAsDirty();
    return false;
  };

  prepareCategoryFormDataForSaving() {
    const formData = new FormData();

    for (const formControlName in this.categoryForm.value) {
      if (formControlName !== 'attributes')
        formData.append(formControlName, this.categoryForm.value[formControlName]);
    }

    if (this.attributeFormArray.value.length)
      formData.append(
        'attributeIds',
        this.attributeFormArray.value.map((attribute: Attribute) => attribute.id)
      );

    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);

    return formData;
  }

  compareAttributeFn(attribute1: Attribute, attribute2: Attribute): boolean {
    return (
      attribute1?.id === attribute2?.id &&
      attribute1?.name === attribute2?.name &&
      attribute1?.inputMode === attribute2?.inputMode &&
      attribute1?.mandatory === attribute2?.mandatory
    );
  }

  addAttributeToFormArray(attribute: Attribute = null): void {
    this.attributeFormArray.push(this.fb.control(attribute, Validators.required));
  }

  removeAttributeFromFormArray(index: number): void {
    this.attributeFormArray.removeAt(index);
  }

  getAttributes(): void {
    this.attributesService.getMany().subscribe(
      (response) => (this.attributes = response),
      (error) => this.messageService.error(error?.error?.message)
    );
  }

  saveAttribute(): void {
    this.attributeIdFormControl.value ? this.updateAttribute() : this.createAttribute();
  }

  createAttribute(): void {
    this.isSaveAttributeBtnLoading = true;
    this.attributesService
      .createOne(this.attributeForm.value)
      .pipe(switchMap((response) => this.attributesService.getMany()))
      .subscribe(
        (response) => {
          this.attributes = response;
          this.isSaveAttributeBtnLoading = false;
          this.messageService.success('Thêm mới thuộc tính thành công!');
          this.hideAttributeModal();
        },
        (error) => this.messageService.error(error?.error?.message)
      );
  }

  updateAttribute(): void {
    const { id, ...data } = this.attributeForm.value;
    this.attributesService
      .updateOne(id, data)
      .pipe(
        switchMap((response) =>
          forkJoin([this.attributesService.getMany(), this.categoriesService.getOne(this.categoryId)])
        )
      )
      .subscribe(
        (response) => {
          this.attributes = response[0];
          this.category.attributes = response[1].attributes;

          this.attributeFormArray.clear();
          for (const attribute of this.category.attributes) {
            this.addAttributeToFormArray(attribute);
          }

          this.messageService.success('Cập nhật thuộc tính thành công!');
          this.hideAttributeModal();
        },
        (error) => this.messageService.error(error?.error?.message)
      );
  }

  showAttributeModal(data: Attribute = null): void {
    if (data) {
      this.attributeIdFormControl.enable();
      this.attributeForm.setValue({
        id: data.id,
        name: data.name,
        inputMode: data.inputMode,
        mandatory: data.mandatory
      });
    } else this.attributeIdFormControl.disable();

    this.isAttributeModalVisible = true;
  }

  hideAttributeModal(): void {
    this.isAttributeModalVisible = false;
    this.attributeForm.reset({ mandatory: false });
  }

  resetStateForRouting(): void {
    this.fileList = [];
    if (this.categoryForm) {
      this.attributeFormArray.clear();
      this.categoryForm.reset();
    }
  }
}
