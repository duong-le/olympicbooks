import { Component, Input, OnInit } from '@angular/core';

import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: '[app-category-menu]',
  template: `
    <ng-container *ngFor="let category of categories">
      <a [routerLink]="['/categories', category.id]">
        <li nz-menu-item nzMatchRouter *ngIf="category.isLeaf">
          {{ category.title }}
        </li>
      </a>

      <a [routerLink]="['/categories', category.id]" *ngIf="!category.isLeaf">
        <li nz-submenu [nzTitle]="category.title">
          <ul app-category-menu [categories]="category.children"></ul>
        </li>
      </a>
    </ng-container>
  `,
  styleUrls: ['../header/sub-menu/sub-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  @Input() categories: Category[];

  constructor() {}

  ngOnInit(): void {}
}
