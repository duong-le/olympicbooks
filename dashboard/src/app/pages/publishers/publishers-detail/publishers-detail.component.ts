import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isNew = true;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private publishersService: PublishersService,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.publisherForm = this.fb.group({
      id: { value: '', disabled: true },
      name: ['', [Validators.required]]
    });

    this.activatedRoute.params.subscribe(({ publisherId }) => {
      this.isNew = publisherId === 'new';
      if (this.isNew) this.isLoading = false;
      else this.render(publisherId);
    });
  }

  render(id: number) {
    this.publishersService.getOne(id).subscribe(
      (response) => {
        this.publisher = response;
        this.publisherForm.setValue({
          id: this.publisher.id,
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
    this.publishersService
      .updateOne(this.publisherForm.controls['id'].value, this.publisherForm.value)
      .subscribe(
        (response) => {
          this.isBtnLoading = false;
          this.messageService.success('Cập nhật thành công!');
          this.router.navigate(['/', 'publishers']);
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
        this.router.navigate(['/', 'publishers']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error(error?.error?.message);
      }
    );
  }
}
