import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/shared/Interfaces/category.interface';

@Component({
  selector: '[app-category-menu]',
  template: `
    <ng-container *ngFor="let category of categories">
      <li nz-menu-item nzMatchRouter *ngIf="category.isLeaf">
        <a [routerLink]="['/categories', category.id]">{{ category.title }}</a>
      </li>
      <li nz-submenu [nzTitle]="category.title" *ngIf="!category.isLeaf">
        <ul app-category-menu [categories]="category.children"></ul>
      </li>
    </ng-container>
  `,
  styleUrls: ['./sub-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  @Input() categories: Category[];

  constructor() {}

  ngOnInit(): void {}
}
