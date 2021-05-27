import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Publisher } from '../../../shared/Interfaces/publisher.interface';
import { PublishersService } from '../publishers.service';

@Component({
  selector: 'app-publishers-detail',
  templateUrl: './publishers-detail.component.html',
  styleUrls: ['./publishers-detail.component.scss']
})
export class PublishersDetailComponent implements OnInit {
  publisherForm: FormGroup;
  publisher: Publisher;

  publisherId: number;
  isNew = true;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private publishersService: PublishersService,
    private messageService: NzMessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.publisherForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ publisherId }) => {
      this.publisherId = publisherId;
      this.isNew = publisherId === 'new';
      if (this.isNew) this.isLoading = false;
      else this.renderPublisherDetailPage();
    });
  }

  renderPublisherDetailPage() {
    this.publishersService.getOne(this.publisherId).subscribe(
      (response) => {
        this.publisher = response;
        this.publisherForm.setValue({
          name: this.publisher.name
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
    this.publishersService.updateOne(this.publisherId, this.publisherForm.value).subscribe(
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
    this.publishersService.createOne(this.publisherForm.value).subscribe(
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
