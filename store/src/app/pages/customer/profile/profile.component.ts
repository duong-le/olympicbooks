import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { constant } from 'src/app/shared/constant';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isUpdateProfileLoading = false;
  isUpdatePasswordLoading = false;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private messageService: NzMessageService
  ) {
    this.titleService.setTitle('Thông tin tài khoản | Olympicbooks');
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(constant.pwdPattern)]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]]
    });

    this.customerService.getMe().subscribe((response) => {
      this.profileForm.setValue({
        email: response.email,
        name: response.name,
        address: response.address,
        phoneNumber: response.phoneNumber
      });
    });
  }

  submitProfileForm() {
    const { email, ...data } = this.profileForm.value;
    this.toggleDisableFormControl(this.profileForm, true, ['email']);
    this.isUpdateProfileLoading = true;
    this.customerService
      .updateMe(data)
      .pipe(
        finalize(() => {
          this.isUpdateProfileLoading = false;
          this.toggleDisableFormControl(this.profileForm, false, ['email']);
        })
      )
      .subscribe(
        (response) => {
          this.profileForm.patchValue({
            name: response.name,
            address: response.address,
            phoneNumber: response.phoneNumber
          });
          this.profileForm.markAsPristine();
          this.profileForm.updateValueAndValidity();
          this.messageService.success('Cập nhật hồ sơ thành công!');
        },
        (error) => this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!')
      );
  }

  submitPasswordForm() {
    const password = this.passwordForm.value['password'];
    this.isUpdatePasswordLoading = true;
    this.toggleDisableFormControl(this.passwordForm, true);
    this.customerService
      .updateMe({ password })
      .pipe(
        finalize(() => {
          this.isUpdatePasswordLoading = false;
          this.toggleDisableFormControl(this.passwordForm, false);
        })
      )
      .subscribe(
        (response) => {
          this.passwordForm.reset();
          this.passwordForm.updateValueAndValidity();
          this.messageService.success('Cập nhật mật khẩu thành công!');
        },
        (error) => this.messageService.error('Có lỗi xảy ra, vui lòng thử lại sau!')
      );
  }

  toggleDisableFormControl(form: FormGroup, value: Boolean, exclude = []) {
    const state = value ? 'disable' : 'enable';
    Object.keys(form.controls).forEach((controlName) => {
      if (!exclude.includes(controlName)) {
        form.controls[controlName][state]();
        form.controls[controlName].updateValueAndValidity();
      }
    });
  }

  updateConfirmValidator() {
    Promise.resolve().then(() => this.passwordForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) return { required: true };
    else if (control.value !== this.passwordForm.controls.password.value) return { confirm: true, error: true };
    return {};
  };
}
