import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
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
  @Input() dataTree: NzTreeNodeOptions[];
  @Output() notifyRender: EventEmitter<any> = new EventEmitter();
  @Output() notifyDelete: EventEmitter<any> = new EventEmitter();

  categoryForm: FormGroup;
  category: Category;
  isLoading = false;
  isBtnLoading = false;
  parentId: string;

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Init data',
      key: '000',
      expanded: true,
      children: []
    }
  ];

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
      img: ['', [Validators.required]]
    });

    if (!this.isNew) this.render();
    if (this.dataTree) this.nodes = this.dataTree;
  }

  ngOnChanges() {
    if (this.isNew && this.categoryForm) {
      this.parentId = null;
      this.categoryForm.reset();
      this.categoryForm.updateValueAndValidity();
    } else if (this.id) this.render();
    if (this.dataTree) this.nodes = this.dataTree;
  }

  render() {
    this.isLoading = true;
    this.categoriesService.getOne(this.id).subscribe((response) => {
      this.category = response;
      this.categoryForm.setValue({
        id: this.category.id,
        title: this.category.title,
        img: this.category.img
      });
      this.parentId = this.category?.parent?.key;
      this.isLoading = false;
    });
  }

  update() {
    this.isBtnLoading = true;
    this.categoriesService
      .updateOne(this.categoryForm.controls['id'].value, { ...this.categoryForm.value, parentId: this.parentId || 0 })
      .subscribe(
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
    this.categoriesService.createOne({ ...this.categoryForm.value, parentId: this.parentId || 0 }).subscribe(
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
}
