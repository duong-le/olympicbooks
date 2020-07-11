import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';
import { AuthenticationService } from '../authentication.service';
import { MessageService } from 'src/app/shared/Services/message.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  passwordVisible = false;
  isLoading = false;
  returnUrl: string;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Đăng nhập | Olymbooks');

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitForm(data: Authentication): void {
    this.isLoading = true;
    this.authenticationService
      .signIn(data)
      .pipe(first())
      .subscribe(
        (response) => {
          this.messageService.createMessage('success', 'Đăng nhập thành công');
          this.isLoading = false;
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          if (error.status === 401)
            this.messageService.createMessage('error', 'Email hoặc mật khẩu không đúng');
          else if (error.status === 403)
            this.messageService.createMessage('error', 'Tài khoản đã bị khóa');
          else
            this.messageService.createMessage('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
          this.isLoading = false;
        }
      );
  }
}
