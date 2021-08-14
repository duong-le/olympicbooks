import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadFile } from 'ng-zorro-antd/upload';

import { AttributeInputMode } from '../../../shared/Enums/attributes.enum';
import { Attribute } from '../../../shared/Interfaces/attribute.interface';
import { Category } from '../../../shared/Interfaces/category.interface';
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
  categoryTree: NzTreeNodeOptions[] = [];
  fileList: NzUploadFile[] = [];
  attributeInputMode = AttributeInputMode;

  attributeFormGroups: string[] = [];
  isLoading = false;
  isBtnLoading = false;
  fileSizeLimit = 500;
  fileTypeLimit = 'image/jpg,image/jpeg,image/png,image/gif';

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required]],
      parentId: ['']
    });

    this.attributeForm = this.fb.group({});
  }

  ngOnChanges() {
    this.fileList = [];
    this.attributeFormGroups = [];
    this.attributeForm = this.fb.group({});
    if (this.isNew && this.categoryForm) {
      this.categoryForm.reset();
    } else if (!this.isNew && this.categoryId && this.categoryData) this.renderCategoryDetailPage();

    if (this.categoryData) this.categoryTree = this.categoryData;
  }

  renderCategoryDetailPage() {
    this.isLoading = true;
    this.categoriesService.getOne(this.categoryId).subscribe(
      (response) => {
        this.category = response;
        this.categoryForm.setValue({
          title: this.category.title,
          // If category has parent(s), the closest parent is second from the right
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
          this.addNewFormGroupToAttributeForm(
            attribute.id,
            attribute.name,
            attribute.inputMode,
            attribute.isRequired
          );
        }

        this.categoryForm.markAsPristine();
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
    this.categoriesService.updateOne(this.categoryId, this.prepareFormData()).subscribe(
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
    this.categoriesService.createOne(this.prepareFormData()).subscribe(
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

  prepareFormData() {
    const formData = new FormData();

    for (const formControl in this.categoryForm.value) {
      formData.append(formControl, this.categoryForm.value[formControl]);
    }

    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);

    return formData;
  }

  addNewFormGroupToAttributeForm(id = null, name = null, inputMode = '', isRequired = true): void {
    const formGroupName = `attribute${this.attributeFormGroups.length}`;
    this.attributeFormGroups.push(formGroupName);
    this.attributeForm.addControl(
      formGroupName,
      this.fb.group({
        id: { value: id, disabled: true },
        name: [name, [Validators.required]],
        inputMode: [inputMode, [Validators.required]],
        isRequired: [isRequired, [Validators.required]]
      })
    );
  }

  removeFormGroupFromAttributeForm(formGroupName: string): void {
    const index = this.attributeFormGroups.indexOf(formGroupName);
    if (!index) return;

    this.attributeFormGroups.splice(index, 1);
    const attributeId = (this.attributeForm.get(formGroupName) as FormGroup).controls['id'].value;
    if (attributeId) this.removeAttribute(attributeId);
    this.attributeForm.removeControl(formGroupName);
  }

  saveAttribute(formGroupName: string): void {
    const formGroup = this.attributeForm.get(formGroupName) as FormGroup;
    const attributeId = formGroup.controls['id'].value;

    attributeId ? this.updateAttribute(attributeId, formGroup.value) : this.createAttribute(formGroup);
  }

  createAttribute(formGroup: FormGroup) {
    this.categoriesService.createOneAttribute(this.categoryId, formGroup.value).subscribe(
      (response) => {
        this.messageService.success('Thêm mới thuộc tính thành công!');
        formGroup.patchValue({ id: response.id });
      },
      (error) => this.messageService.error(error?.error?.message)
    );
  }

  updateAttribute(attributeId: number, data: Attribute) {
    this.categoriesService.updateOneAttribute(this.categoryId, attributeId, data).subscribe(
      (response) => this.messageService.success('Cập nhật thuộc tính thành công!'),
      (error) => this.messageService.error(error?.error?.message)
    );
  }

  removeAttribute(attributeId: number) {
    this.categoriesService.deleteOneAttribute(this.categoryId, attributeId).subscribe(
      (response) => this.messageService.success('Xoá thuộc tính thành công!'),
      (error) => this.messageService.error(error?.error?.message)
    );
  }
}
