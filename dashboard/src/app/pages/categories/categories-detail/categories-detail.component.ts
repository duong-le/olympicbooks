import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Category } from 'src/app/shared/Interfaces/category.interface';
import { CategoriesService } from 'src/app/pages/categories/categories.service';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.scss']
})
export class CategoriesDetailComponent implements OnInit, OnChanges {
  @Input() id: number;
  @Input() isNew: boolean;
  @Input() categoryData: NzTreeNodeOptions[];
  @Output() notifyRender: EventEmitter<any> = new EventEmitter();
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();

  categoryForm: FormGroup;
  category: Category;
  categoryTree: NzTreeNodeOptions[] = [];
  fileList: NzUploadFile[] = [];

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
      id: { value: '', disabled: true },
      title: ['', [Validators.required]],
      parentId: ['']
    });

    if (!this.isNew) this.render();
    if (this.categoryData) this.categoryTree = this.categoryData;
  }

  ngOnChanges() {
    if (this.isNew && this.categoryForm) {
      this.category = null;
      this.categoryForm.reset();
      this.categoryForm.updateValueAndValidity();
    } else if (this.id) this.render();
    if (this.categoryData) this.categoryTree = this.categoryData;
    if (this.categoryForm) this.categoryForm.controls['parentId'][this.isNew ? 'enable' : 'disable']();
    this.fileList = [];
  }

  render() {
    this.isLoading = true;
    this.categoriesService.getOne(this.id).subscribe((response) => {
      this.category = response;
      this.categoryForm.setValue({
        id: this.category.id,
        title: this.category.title,
        parentId: this.category?.parent?.length > 1 ? this.category.parent[this.category.parent.length - 2].id : null
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
      this.categoryForm.markAsPristine();
      this.isLoading = false;
    });
  }

  update() {
    this.isBtnLoading = true;
    const formData = new FormData();
    formData.append('title', this.categoryForm.controls['title'].value);
    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);

    this.categoriesService.updateOne(this.category.id, formData).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.notifyRender.emit();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  create() {
    this.isBtnLoading = true;
    const formData = new FormData();
    formData.append('title', this.categoryForm.controls['title'].value);
    formData.append('parentId', this.categoryForm.controls['parentId'].value || 0);
    if (this.fileList.length) formData.append('attachment', this.fileList[0] as any);

    this.categoriesService.createOne(formData).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Thêm mới thành công!');
        this.notifyRender.emit();
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  showDeleteConfirm() {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa không?',
      nzOnOk: () => this.delete()
    });
  }

  delete() {
    this.isLoading = true;
    this.categoriesService.deleteOne(this.categoryForm.controls['id'].value).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Xoá thành công!');
        this.notifyDelete.emit();
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.categoryForm.markAsDirty();
    return false;
  };
}
