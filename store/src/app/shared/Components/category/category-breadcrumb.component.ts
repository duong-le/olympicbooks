import { Component, Input } from '@angular/core';

import { Category } from '../../Interfaces/category.interface';

@Component({
  selector: 'app-category-breadcrumb',
  template: `
    <nz-breadcrumb nzSeparator=">">
      <nz-breadcrumb-item *ngIf="prefix">
        {{ prefix }}
      </nz-breadcrumb-item>

      <nz-breadcrumb-item *ngIf="!prefix">
        <a routerLink="/"><i nz-icon nzType="home"></i></a>
      </nz-breadcrumb-item>

      <ng-container *ngFor="let category of categories">
        <nz-breadcrumb-item>
          <a [routerLink]="['/', 'danh-muc', category?.slug]">{{ category?.title }}</a>
        </nz-breadcrumb-item>
      </ng-container>

      <nz-breadcrumb-item *ngIf="suffix">
        {{ suffix }}
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: [
    `
      .ant-input {
        border-radius: 0;
      }
    `
  ]
})
export class CategoryBreadCrumbComponent {
  @Input() categories: Category[];
  @Input() prefix: string;
  @Input() suffix: string;

  constructor() {}
}
