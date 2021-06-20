import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthenticationService } from '../authentication.service';

const passwordPattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  passwordVisible = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(passwordPattern)]]
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.authenticationService.signUp(this.signUpForm.value).subscribe(
      (response) => {
        this.messageService.success('Đăng ký thành công');
        this.isLoading = false;
        this.router.navigate(['signin']);
      },
      (error) => {
        if (error.status === 409) this.messageService.error('Email đã tồn tại');
        else this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!');
        this.isLoading = false;
      }
    );
  }
}
