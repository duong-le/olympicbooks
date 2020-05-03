import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RightMenuComponent } from './nav-bar/sub-menu/right-menu.component';
import { LeftMenuComponent } from './nav-bar/sub-menu/left-menu.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';

import { IconsProviderModule } from '../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [
    NavBarComponent,
    RightMenuComponent,
    LeftMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzMenuModule,
    NzDrawerModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule
  ],
  exports: [
    NavBarComponent,
    RightMenuComponent,
    LeftMenuComponent,
    FooterComponent,
    SearchComponent,
    ProductComponent,
    CategoryComponent
  ]
})
export class SharedComponentsModule {}
