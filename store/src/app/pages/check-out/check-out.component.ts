import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  loading = false;
  isProcessingOrder = false;
  isVisible = false;
  success = false;
  error = false;

  radioValue = 'A';
  user = {
    name: 'Dương Lê',
    phone: '0848275991',
    add: 'CT3 Bắc Từ Liêm, Phường Hoàng Liệt, Quận Hai Bà Trưng, Hà Nội'
  };

  items = [
    {
      name: 'Nhà Giả Kim',
      src: 'https://picsum.photos/seed/123/50',
      quantity: 1,
      price: 112334
    },
    {
      name: 'Lập trình hướng đối tượng dành cho người mới bắt đầu',
      src: 'https://picsum.photos/seed/124/50',
      quantity: 2,
      price: 56000
    },
    {
      name: 'Khi Hơi Thở Hóa Thinh Không',
      src: 'https://picsum.photos/seed/125/50',
      quantity: 3,
      price: 2180000
    }
  ];
  addressForm: FormGroup;

  constructor(private titleService: Title, private fb: FormBuilder) {
    this.titleService.setTitle('Thanh toán | Olymbooks');
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    for (const i in this.addressForm.controls) {
      this.addressForm.controls[i].markAsDirty();
      this.addressForm.controls[i].updateValueAndValidity();
    }
    console.log(this.addressForm.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  processOrder() {
    this.isProcessingOrder = true;
    setTimeout(() => {
      this.isProcessingOrder = false;
      if (Math.random() > 0.5) {
        this.success = true;
      } else this.error = true;
    }, 2000);
  }
}
