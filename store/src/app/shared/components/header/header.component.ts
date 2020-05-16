import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  visible = false;
  horizontalMode = 'horizontal';
  verticalMode = 'inline';
  quantity = 12;

  constructor() {}

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
