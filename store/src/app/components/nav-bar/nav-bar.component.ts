import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  visible = false;
  horiontalMode = 'horizontal';
  verticalMode = 'inline';
  quantity = 1;

  constructor() {}

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
