import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';
import { AuthenticationService } from '../authentication.service';
import { constant } from 'src/app/shared/constant';
import { MessageService } from 'src/app/shared/Services/message.service';

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
    private titleService: Title,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Đăng ký | Olympicbooks');

    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(constant.pwdPattern)]
      ]
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.authenticationService.signUp(this.signUpForm.value).subscribe(
      (response) => {
        this.messageService.createMessage('success', 'Đăng ký thành công');
        this.isLoading = false;
        this.router.navigate(['signin']);
      },
      (error) => {
        if (error.status === 409)
          this.messageService.createMessage('error', 'Email đã tồn tại');
        else
          this.messageService.createMessage('error', 'Có lỗi xảy ra, vui lòng thử lại sau!');
        this.isLoading = false;
      }
    );
  }
}
