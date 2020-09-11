import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-exist',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary" routerLink="/">Back Home</button>
      </div>
    </nz-result>
  `
})
export class NotExistComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Không tìm thấy trang yêu cầu | OlympicBooks');
  }

  ngOnInit(): void {}
}
