import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PublishersService } from '../publishers.service';
import { Publisher } from 'src/app/shared/Interfaces/publisher.interface';

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

    this.activatedRoute.params.subscribe(({ id }) => {
      this.isNew = id === 'new';
      if (this.isNew) this.isLoading = false;
      else this.render(id);
    });
  }

  render(id: number) {
    this.publishersService.getOne(id).subscribe((response) => {
      this.publisher = response;
      this.publisherForm.setValue({
        id: this.publisher.id,
        name: this.publisher.name
      });
      this.isLoading = false;
    });
  }

  save() {
    this.isBtnLoading = true;
    this.publishersService.updateOne(this.publisherForm.controls['id'].value, this.publisherForm.value).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.router.navigate(['/', 'publishers']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
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
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }
}
