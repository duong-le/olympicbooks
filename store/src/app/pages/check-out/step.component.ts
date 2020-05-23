import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  template: `
    <nz-card [nzBodyStyle]="{ padding: 0 }">
      <nz-steps nzType="navigation" [nzStartIndex]="1" [nzCurrent]="step">
        <nz-step nzTitle="Giỏ hàng" nzIcon="shopping-cart"></nz-step>
        <nz-step nzTitle="Địa chỉ giao hàng" nzIcon="home"></nz-step>
        <nz-step nzTitle="Thanh toán" nzIcon="credit-card"></nz-step>
      </nz-steps>
    </nz-card>
  `,
  styles: ['nz-card { margin-bottom: 25px; }']
})
export class StepComponent implements OnInit {
  @Input() step: number;

  constructor() {}

  ngOnInit(): void {}
}
