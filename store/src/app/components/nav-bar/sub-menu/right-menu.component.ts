import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class RightMenuComponent {
  @Input() mode: string;
  @Input() quantity: number;
  @Input() mobile: boolean;

  constructor() {}
}
