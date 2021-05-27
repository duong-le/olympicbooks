import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Author } from '../../../shared/Interfaces/author.interface';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors-detail',
  templateUrl: './authors-detail.component.html',
  styleUrls: ['./authors-detail.component.scss']
})
export class AuthorsDetailComponent implements OnInit {
  authorForm: FormGroup;
  author: Author;

  authorId: number;
  isNew = true;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ authorId }) => {
      this.authorId = authorId;
      this.isNew = authorId === 'new';
      if (this.isNew) this.isLoading = false;
      else this.renderAuthorDetailPage();
    });
  }

  renderAuthorDetailPage() {
    this.authorsService.getOne(this.authorId).subscribe(
      (response) => {
        this.author = response;
        this.authorForm.setValue({
          name: this.author.name
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
    this.authorsService.updateOne(this.authorId, this.authorForm.value).subscribe(
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
    this.authorsService.createOne(this.authorForm.value).subscribe(
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

  goBack() {
    this.location.back();
  }
}
