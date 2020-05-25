import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class RightMenuComponent {
  @Input() mode: string;
  @Input() quantity: number;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onMenuTitleClick() {
    this.onNavigate.emit();
  }
}
