import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class LeftMenuComponent {
  @Input() mode: string;
  @Input() mobile: boolean;

  constructor() {}
}
