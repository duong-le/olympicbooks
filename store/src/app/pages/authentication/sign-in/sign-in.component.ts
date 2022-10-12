import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: UntypedFormGroup;
  passwordVisible = false;
  isLoading = false;
  returnUrl: string;

  constructor(
    private titleService: Title,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private messageService: NzMessageService
  ) {
    this.titleService.setTitle('Đăng nhập | OlympicBooks');
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitSignInForm(): void {
    this.isLoading = true;
    this.authenticationService.signIn(this.signInForm.value).subscribe(
      (response) => {
        this.messageService.success('Đăng nhập thành công');
        this.isLoading = false;
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        if (error.status === 401) this.messageService.error('Email hoặc mật khẩu không đúng');
        else if (error.status === 403) this.messageService.error('Tài khoản đã bị khóa');
        else this.messageService.error('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!');
        this.isLoading = false;
      }
    );
  }
}
