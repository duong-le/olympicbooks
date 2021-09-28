import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  visible = false;
  horizontalMode = 'horizontal';
  verticalMode = 'inline';

  constructor(private router: Router) {}

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSearch(value: string) {
    this.router.navigate(['search'], { queryParams: { keyword: value } });
  }
}
