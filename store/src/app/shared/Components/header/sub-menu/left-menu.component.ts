import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/pages/categories/categories.service';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: 'app-left-menu',
  template: `
    <ul nz-menu [nzMode]="mode" [nzSelectable]="false" (nzClick)="onMenuTitleClick()">
      <app-search *ngIf="mobile"></app-search>

      <li nz-submenu nzTitle="Danh mục" nzIcon="appstore">
        <ul app-category-menu [categories]="categories"></ul>
      </li>

      <li nz-menu-item>
        <a href="https://medium.com/olympicbooks" target="_blank"
          ><i nz-icon nzType="team" nzTheme="outline"></i>Cộng đồng</a
        >
      </li>
    </ul>
  `,
  styleUrls: ['./sub-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  @Input() mode: string;
  @Input() mobile: boolean;
  @Output() onNavigate: EventEmitter<any> = new EventEmitter();
  categories: Category[];

  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit() {
    this.CategoriesService.categories$.subscribe(
      (response) => (this.categories = response),
      (error) => {}
    );
  }

  onMenuTitleClick() {
    this.onNavigate.emit();
  }
}
