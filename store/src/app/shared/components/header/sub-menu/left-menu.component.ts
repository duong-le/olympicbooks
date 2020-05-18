import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class LeftMenuComponent {
  @Input() mode: string;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClick() {
    this.onNavigate.emit();
  }
}
