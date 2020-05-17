import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../authentication.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private titleService: Title, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.titleService.setTitle('Log In | Olymbooks');

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm(value): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    console.log(value);
  }
}
