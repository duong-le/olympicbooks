import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { first } from 'rxjs/operators';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  passwordVisible = false;
  isLoading = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Đăng nhập | Olymbooks');

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm(data: Authentication): void {
    this.isLoading = true;
    this.authenticationService
      .signIn(data)
      .pipe(first())
      .subscribe(
        (response) => {
          this.createMessage('success', 'Đăng nhập thành công');
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.status === 401)
            this.createMessage('error', 'Email hoặc mật khẩu không đúng');
          else if (error.status === 403)
            this.createMessage('error', 'Tài khoản đã bị khóa');
          else
            this.createMessage('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
          this.isLoading = false;
        }
      );
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
