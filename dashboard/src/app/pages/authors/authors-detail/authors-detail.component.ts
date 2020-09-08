import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Author } from 'src/app/shared/Interfaces/author.interface';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors-detail',
  templateUrl: './authors-detail.component.html',
  styleUrls: ['./authors-detail.component.scss']
})
export class AuthorsDetailComponent implements OnInit {
  authorForm: FormGroup;
  author: Author;
  isNew = true;
  isLoading = true;
  isBtnLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private messageService: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorForm = this.fb.group({
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
    this.authorsService.getOne(id).subscribe((response) => {
      this.author = response;
      this.authorForm.setValue({
        id: this.author.id,
        name: this.author.name
      });
      this.isLoading = false;
    });
  }

  update() {
    this.isBtnLoading = true;
    this.authorsService.updateOne(this.authorForm.controls['id'].value, this.authorForm.value).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Cập nhật thành công!');
        this.router.navigate(['/', 'authors']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }

  create() {
    this.isBtnLoading = true;
    this.authorsService.createOne(this.authorForm.value).subscribe(
      (response) => {
        this.isBtnLoading = false;
        this.messageService.success('Thêm mới thành công!');
        this.router.navigate(['/', 'authors']);
      },
      (error) => {
        this.isBtnLoading = false;
        this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    );
  }
}
